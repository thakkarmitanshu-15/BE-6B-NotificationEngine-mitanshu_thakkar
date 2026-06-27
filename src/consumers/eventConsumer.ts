import { kafka } from "../config/kafka";
import { pool } from "../config/database";
import { enrichEvent } from "../enrichment/eventEnrichment";
import { isDuplicate } from "../deduplication/redisDeduplicator";
import { getUserPreferences } from "../services/preferenceService";
import { resolvePreferences } from "../services/preferenceResolver";
import { canSendNotification } from "../compliance/frequencyCap"; 
import { isQuietHours } from "../compliance/quietHours";
import { isDndEnabled } from "../compliance/dndService";
import { getProvider } from "../providers/ProviderFactory";
import { CircuitBreaker } from "../circuitbreaker/circuitBreaker";
import {getAllChannels} from "../routing/intelligentRouter";
import { logger } from "../logger/logger";


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
          logger.warn("Duplicate event ignored");
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
        const scoredChannels = getAllChannels(event.eventType);

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
        const channels = scoredChannels.filter((channel) => {
      switch (channel) {

      case "email":
        return finalPreferences.emailEnabled;

      case "sms":
        return finalPreferences.smsEnabled;

      case "push":
        return finalPreferences.pushEnabled;

      case "whatsapp":
        return finalPreferences.whatsappEnabled;

      case "inapp":
        return true;

      default:
        return false;

    }
  }
);

        logger.info({ message: "Final Channels", channels });

        const allowed = await canSendNotification(
          event.userId
        );

        if (!allowed) {

          logger.warn("Frequency cap reached");

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
        const criticalEvent =
            event.eventType.startsWith("RISK");

            if (criticalEvent) {
            await pool.query(
              `
              INSERT INTO critical_event_audit
              (
                event_id,
                reason
              )
              VALUES($1,$2)
              `,
              [
                event.eventId,
                "Critical event bypassed quiet hours",
              ]
            );

            logger.warn("Critical Event - Bypass Enabled");
          }

          if (
            isQuietHours() &&
            !criticalEvent
          ) {

           logger.warn("Quiet Hours - Queued");

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
                JSON.stringify(enrichedEvent),
              ]
            );

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
        // Digest Mode
        // -----------------------------
        if (finalPreferences.digestMode) {

  logger.info("Digest Mode Enabled");

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
      JSON.stringify(enrichedEvent),
    ]
  );

  logger.info("Notification added to digest queue");

  // Commit offset
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

  // STOP processing
  return;
}
       else {
          logger.info("Immediate Delivery");
                  if (channels.includes("sms")) {

          const blocked =
            await isDndEnabled(
             event.phoneNumber
            );

          if (blocked) {

            logger.warn("SMS blocked by DND");

            const index =
              channels.indexOf("sms");

            channels.splice(index, 1);
          }

}
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

        logger.info("Saved to PostgreSQL");

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

        logger.info({ message: "Offset committed", offset: message.offset });
      } catch (error) {
      logger.error({
        message: "Consumer Error",
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      });      }
    },
  });
}