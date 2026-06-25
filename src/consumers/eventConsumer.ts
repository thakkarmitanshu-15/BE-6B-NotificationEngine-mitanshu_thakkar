import { kafka } from "../config/kafka";
import { pool } from "../config/database";
import { enrichEvent } from "../enrichment/eventEnrichment";
import { routeEvent } from "../routing/notificationRouter";
import { isDuplicate } from "../deduplication/redisDeduplicator";
import { getUserPreferences } from "../services/preferenceService";
import { resolvePreferences } from "../services/preferenceResolver";

const consumer = kafka.consumer({
  groupId: "notification-group",
});

export async function startConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "financial-events",
    fromBeginning: true,
  });

  await consumer.run({
    autoCommit: false,

    eachMessage: async ({
      topic,
      partition,
      message,
    }) => {
      try {
        const event = JSON.parse(
          message.value?.toString() || "{}"
        );

        // -----------------------------
        // Deduplication
        // -----------------------------
        const duplicate = await isDuplicate(
          event.eventId
        );

        if (duplicate) {
          console.log("Duplicate event ignored");

          await consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (
                Number(message.offset) + 1
              ).toString(),
            },
          ]);

          return;
        }

        // -----------------------------
        // Event Enrichment
        // -----------------------------
        const enrichedEvent =
          await enrichEvent(event);

        // -----------------------------
        // Routing
        // -----------------------------
        const routing = routeEvent(
          event.eventType
        );

        // -----------------------------
        // User Preferences
        // -----------------------------
        const preferences =
          await getUserPreferences(
            event.userId
          );

        const userPreferences = {
          emailEnabled:
            preferences.email_enabled,
          smsEnabled:
            preferences.sms_enabled,
          pushEnabled:
            preferences.push_enabled,
          whatsappEnabled:
            preferences.whatsapp_enabled,
          digestMode:
            preferences.digest_mode,
          language:
            preferences.language,
        };

        const finalPreferences =
          resolvePreferences(
            userPreferences,
            false, // Premium User
            false // Regulatory Override
          );

        // -----------------------------
        // Filter Channels
        // -----------------------------
        const channels =
          routing.channels.filter(
            (channel) => {
              switch (channel) {
                case "email":
                  return finalPreferences.emailEnabled;

                case "sms":
                  return finalPreferences.smsEnabled;

                case "push":
                  return finalPreferences.pushEnabled;

                case "whatsapp":
                  return finalPreferences.whatsappEnabled;

                default:
                  return false;
              }
            }
          );

        console.log(
          "Final Channels:",
          channels
        );

        // -----------------------------
        // Digest Mode
        // -----------------------------
        if (
          finalPreferences.digestMode
        ) {
          console.log(
            "Digest Mode Enabled"
          );

          await pool.query(
            `
            INSERT INTO notification_digest
            (
              user_id,
              event_id,
              payload,
              created_at
            )
            VALUES($1,$2,$3,NOW())
            `,
            [
              event.userId,
              event.eventId,
              JSON.stringify(
                enrichedEvent
              ),
            ]
          );

          console.log(
            "Notification added to digest queue"
          );
        } else {
          console.log(
            "Immediate Delivery"
          );

          // Day 7:
          // Email Provider
          // SMS Provider
          // Push Provider
        }

        // -----------------------------
        // Store Event
        // -----------------------------
        await pool.query(
          `
          INSERT INTO events(
            event_id,
            event_type,
            payload
          )
          VALUES($1,$2,$3)
          `,
          [
            event.eventId,
            event.eventType,
            JSON.stringify(
              enrichedEvent
            ),
          ]
        );

        console.log(
          "Saved to PostgreSQL"
        );

        // -----------------------------
        // Commit Offset
        // -----------------------------
        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (
              Number(message.offset) + 1
            ).toString(),
          },
        ]);

        console.log(
          `Offset committed: ${message.offset}`
        );
      } catch (error) {
        console.error(
          "Consumer Error:",
          error
        );
      }
    },
  });
}