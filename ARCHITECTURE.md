# Architecture Documentation

## System Overview

The Event-Driven Notification Engine follows an event-driven microservice-inspired architecture. Financial events are published to Kafka, processed asynchronously, enriched, validated, routed through intelligent notification logic, and delivered using multiple communication providers.

---

# High-Level Architecture

```text
+----------------------+
| Financial System     |
+----------+-----------+
           |
           v
+----------------------+
| Kafka Producer       |
+----------+-----------+
           |
           v
+----------------------+
| Kafka Topic          |
| financial-events     |
+----------+-----------+
           |
           v
+----------------------+
| Kafka Consumer       |
+----------+-----------+
           |
           v
+----------------------+
| Deduplication        |
| (Redis)             |
+----------+-----------+
           |
           v
+----------------------+
| Event Enrichment     |
+----------+-----------+
           |
           v
+----------------------+
| Compliance Engine    |
| • Quiet Hours        |
| • DND               |
| • Frequency Cap     |
+----------+-----------+
           |
           v
+----------------------+
| Preference Resolver  |
+----------+-----------+
           |
           v
+----------------------+
| Intelligent Router   |
+----------+-----------+
           |
           v
+----------------------+
| Delivery Providers   |
| Email / SMS / Push   |
| WhatsApp / In-App    |
+----------+-----------+
           |
           v
+----------------------+
| Retry & DLQ          |
+----------+-----------+
           |
           v
+----------------------+
| PostgreSQL           |
| Analytics            |
+----------------------+
```

---

# Notification Processing Flow

1. A financial event is published to Kafka.
2. The consumer receives the event.
3. Redis checks for duplicate events.
4. The event is enriched with additional metadata.
5. Compliance checks (quiet hours, DND, frequency caps) are applied.
6. User preferences determine the eligible delivery channels.
7. The intelligent routing engine selects the best provider.
8. Notifications are sent through the configured providers.
9. Failed deliveries trigger retries or are moved to the Dead Letter Queue.
10. Delivery status and analytics are stored in PostgreSQL.

---

# Major Components

### Event Processing

* Kafka Producer
* Kafka Consumer
* Event Enrichment

### Compliance

* DND Service
* Quiet Hours
* Frequency Cap

### Routing

* Intelligent Routing Engine
* Circuit Breaker
* Provider Failover

### Delivery

* Email Provider
* SMS Provider
* Push Provider
* WhatsApp Provider
* In-App Provider

### Monitoring

* Winston Logging
* Health Endpoints
* Metrics API
* Analytics

---

# Database Overview

Primary Database:

* PostgreSQL

Caching:

* Redis

Messaging:

* Kafka
* RabbitMQ

---

# Design Goals

* Scalability
* Reliability
* Fault Tolerance
* High Availability
* Extensibility
* Production Readiness
