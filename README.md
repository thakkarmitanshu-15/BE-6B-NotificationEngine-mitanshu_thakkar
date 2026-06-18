# Event Driven Notification Engine

## Overview

The Event Driven Notification Engine is a scalable backend platform designed to process financial events and deliver notifications across multiple communication channels.

Supported channels include:

* SMS
* Email
* Push Notifications
* WhatsApp
* In-App Notifications

The system is designed using Event Driven Architecture principles and supports high availability, fault tolerance, retry mechanisms, delivery tracking, and analytics.

---

## Features

* Event Driven Architecture
* Multi Channel Notification Delivery
* User Preference Management
* Template Personalization
* Delivery Tracking
* Retry Mechanism
* Dead Letter Queue
* Quiet Hours Enforcement
* Frequency Capping
* DND Compliance
* Real Time Analytics

---

## Technology Stack

* Node.js
* TypeScript
* PostgreSQL
* Redis
* Apache Kafka
* RabbitMQ
* Docker Compose

---

## Infrastructure Services

### PostgreSQL

Stores notifications, user preferences, delivery status, and audit logs.

### Redis

Used for caching, rate limiting, and analytics aggregation.

### Kafka

Handles event ingestion and event streaming.

### RabbitMQ

Handles notification routing, retries, and dead letter queues.

---

## Architecture

The system follows an Event Driven Architecture pattern:

Financial Event → Kafka → Event Processor → RabbitMQ → Delivery Channels → Analytics

---

## Future Enhancements

* AI-based channel optimization
* Smart notification scheduling
* Advanced analytics dashboards
* Multi-language template management
* Predictive delivery optimization
