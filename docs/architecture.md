# Event Driven Notification Engine Architecture

## 1. System Context Diagram

```text
Financial Trading Systems
Market Data Providers
Investment Platforms
Regulatory Systems
          |
          v
+--------------------------------+
| Notification Engine            |
+--------------------------------+
          |
          +---- SMS Gateway
          +---- Email Provider
          +---- Push Service
          +---- WhatsApp API
          +---- In-App Service
```

The Notification Engine acts as the central platform responsible for receiving financial events and distributing notifications to end users through multiple communication channels.

---

## 2. Container Diagram

```text
+-----------------------------+
| API Service                 |
+-----------------------------+
            |
            v
+-----------------------------+
| Kafka Event Bus             |
+-----------------------------+
            |
            v
+-----------------------------+
| Event Processing Service    |
+-----------------------------+
            |
            v
+-----------------------------+
| RabbitMQ                    |
+-----------------------------+
            |
   -----------------------
   |    |    |    |    |
   v    v    v    v    v

 SMS Email Push WhatsApp In-App

            |
            v
+-----------------------------+
| PostgreSQL                  |
+-----------------------------+

+-----------------------------+
| Redis                       |
+-----------------------------+

+-----------------------------+
| Analytics Service           |
+-----------------------------+
```

---

## 3. Component Diagram

### Event Ingestion Layer

Responsible for accepting incoming financial events from external systems.

### Event Processing Engine

Validates incoming events and enriches them with user information.

### Preference Management Service

Determines whether the user wants to receive a notification and through which channel.

### Template Engine

Generates personalized content using templates and event data.

### Routing Engine

Selects the most appropriate delivery channel.

### Delivery Engine

Sends notifications through SMS, Email, Push, WhatsApp, and In-App providers.

### Retry Engine

Retries failed notifications according to configured retry policies.

### Dead Letter Queue

Stores permanently failed notifications for manual review.

### Analytics Service

Tracks delivery metrics, read rates, failure rates, and notification costs.

---

## Event Processing Flow

1. Financial event generated.
2. Event published to Kafka.
3. Event Processor consumes event.
4. User preferences loaded.
5. Notification template rendered.
6. Notification routed to RabbitMQ.
7. Delivery worker sends notification.
8. Delivery status recorded.
9. Analytics updated.
10. Failed notifications retried or sent to DLQ.
