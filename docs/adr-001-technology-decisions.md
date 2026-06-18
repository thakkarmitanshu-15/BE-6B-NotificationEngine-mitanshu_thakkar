# ADR-001 Technology Decisions

## Project Overview

The Event Driven Notification Engine is designed to process financial events and deliver notifications through multiple channels including SMS, Email, Push Notifications, WhatsApp, and In-App notifications. The system must support high throughput, fault tolerance, retry mechanisms, delivery tracking, analytics, and regulatory compliance.

---

## Technology Decisions

### 1. TypeScript

**Decision:** Use TypeScript for backend development.

**Justification:**

* Strong type safety reduces runtime errors.
* Better maintainability for large codebases.
* Improved IDE support and developer productivity.
* Enables strict compiler checks using strict mode and noImplicitAny.
* Industry standard for enterprise Node.js applications.

---

### 2. Node.js

**Decision:** Use Node.js as the runtime environment.

**Justification:**

* Event-driven and non-blocking architecture.
* Excellent support for asynchronous processing.
* Large ecosystem of packages.
* Well suited for notification processing and API services.
* Fast development cycle.

---

### 3. PostgreSQL

**Decision:** Use PostgreSQL as the primary database.

**Justification:**

* ACID compliant relational database.
* Excellent support for transactional workloads.
* Strong indexing and query capabilities.
* Reliable audit logging support.
* Suitable for notification tracking and reporting.

---

### 4. Redis

**Decision:** Use Redis for caching and rate limiting.

**Justification:**

* Extremely low latency.
* Supports counters and expiration policies.
* Ideal for frequency capping.
* Useful for caching user preferences.
* Supports real-time analytics aggregation.

---

### 5. Apache Kafka

**Decision:** Use Kafka as the primary event ingestion platform.

**Justification:**

* High throughput event streaming.
* Event replay capabilities.
* Consumer group support.
* Durable event storage.
* Suitable for large-scale event processing.

---

### 6. RabbitMQ

**Decision:** Use RabbitMQ for notification delivery queues.

**Justification:**

* Reliable message delivery.
* Dead Letter Queue support.
* Retry mechanisms.
* Priority queues.
* Easy routing between notification channels.

---

## Architectural Approach

The system follows Event Driven Architecture (EDA).

Flow:

Event Producer → Kafka → Event Processor → RabbitMQ → Notification Services → Delivery Providers → Analytics Pipeline

This architecture ensures scalability, fault tolerance, and reliability while supporting multiple notification channels.
