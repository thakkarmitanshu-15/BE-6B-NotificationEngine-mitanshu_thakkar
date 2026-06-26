# Day 8 - Intelligent Routing Engine with Failover

## Objective

Implement an intelligent notification routing engine capable of selecting the best delivery channel, handling provider failures, and preventing duplicate notification delivery.

---

## Features Implemented

### 1. Priority-Based Channel Scoring

Implemented a scoring engine that assigns a priority score to every notification channel.

Example:

* Push → 90
* Email → 80
* SMS → 70
* WhatsApp → 60
* In-App → 50

Critical notifications can receive different scoring to prioritise urgent delivery.

---

### 2. Intelligent Routing

Implemented an intelligent routing module that selects the most appropriate notification channel based on channel scores.

Instead of fixed routing rules, notifications are dynamically routed according to channel priority.

---

### 3. Multi-Channel Fan-Out

Implemented fan-out logic for notifications requiring delivery through multiple channels.

Duplicate channels are removed before delivery to prevent sending the same notification multiple times through the same channel.

---

### 4. Delivery Acknowledgement

Introduced a standard delivery acknowledgement object returned by every provider.

Each acknowledgement contains:

* Provider name
* Delivery status
* Timestamp

This allows the system to track successful and failed deliveries consistently.

---

### 5. Circuit Breaker

Implemented a three-state circuit breaker.

States:

* CLOSED
* OPEN
* HALF-OPEN

The circuit breaker tracks provider failures and temporarily blocks requests after repeated failures until recovery is attempted.

---

### 6. Provider Failover

Implemented provider failover configuration.

Examples:

SMS

MSG91

↓

Twilio

Push

Firebase Cloud Messaging

↓

Apple Push Notification Service (APNS)

If the primary provider fails, the notification can be routed to the backup provider.

---

### 7. Idempotency

Implemented duplicate delivery protection.

Every notification is checked before delivery to ensure that retries or failover mechanisms do not deliver the same notification multiple times.

---

### 8. Provider Factory

Extended the Provider Factory to support intelligent provider selection for multiple notification channels.

Supported providers:

* Email
* SMS
* Push
* WhatsApp
* In-App

---

### 9. Integration Testing

Implemented failover simulation tests and verified:

* Channel scoring
* Intelligent routing
* Delivery acknowledgement
* Circuit breaker behaviour
* Duplicate prevention

---

## Technologies Used

* Node.js
* TypeScript
* Kafka
* PostgreSQL
* Redis
* Express.js
* Nodemailer

---

## Workflow

Kafka Event

↓

Event Consumer

↓

Event Enrichment

↓

Preference Resolution

↓

Channel Scoring

↓

Intelligent Routing

↓

Circuit Breaker

↓

Provider Selection

↓

Delivery Acknowledgement

↓

Notification Delivery

---

## Deliverables

* Priority-based channel scoring
* Intelligent routing engine
* Multi-channel fan-out
* Delivery acknowledgement tracking
* Three-state circuit breaker
* Provider failover
* Idempotency protection
* Failover simulation tests

---

## Outcome

Successfully implemented an intelligent notification routing engine capable of selecting the best delivery channel, handling provider failures through circuit breaking and failover, and preventing duplicate notification delivery.
