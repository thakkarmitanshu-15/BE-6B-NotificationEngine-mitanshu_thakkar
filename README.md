# Event-Driven Notification Engine

## Project Overview

The Event-Driven Notification Engine is a scalable backend application that processes financial events and delivers notifications through multiple communication channels. It uses an event-driven architecture to ensure reliable, asynchronous, and fault-tolerant notification delivery.

The system supports intelligent channel routing, user preference management, retry mechanisms, dead letter queue processing, analytics, monitoring, and production-ready deployment.

---

# Features

* Event-driven notification processing using Kafka
* Multi-channel notification delivery

  * Email
  * SMS
  * Push Notifications
  * WhatsApp
  * In-App Notifications
* User preference management
* Intelligent channel routing
* Provider failover
* Circuit breaker
* Retry mechanism with exponential backoff
* Dead Letter Queue (DLQ)
* Analytics and metrics
* Health monitoring
* Structured logging
* Docker support
* GitHub Actions CI/CD
* Swagger API documentation
* Postman Collection
* Unit and integration testing

---

# Technology Stack

## Backend

* Node.js
* TypeScript
* Express.js

## Messaging

* Apache Kafka
* RabbitMQ

## Database

* PostgreSQL
* Redis

## Monitoring

* Winston Logging
* Prometheus-style Metrics

## Testing

* Jest
* Postman

## Documentation

* Swagger UI
* OpenAPI 3.0

## DevOps

* Docker
* Docker Compose
* GitHub Actions

---

# Project Structure

```text
src/
├── analytics/
├── cache/
├── circuitbreaker/
├── compliance/
├── config/
├── consumers/
├── deduplication/
├── enrichment/
├── health/
├── localization/
├── logger/
├── middleware/
├── monitoring/
├── producers/
├── providers/
├── retry/
├── routes/
├── routing/
├── services/
├── template-engine/
└── tests/
```

---

# Architecture Overview

```
Financial Event

↓

Kafka Producer

↓

Kafka Consumer

↓

Deduplication

↓

Enrichment

↓

Compliance

↓

Preference Resolution

↓

Intelligent Routing

↓

Delivery Providers

↓

Retry / DLQ

↓

Analytics

↓

Database
```

---

# API Documentation

Swagger UI

```
http://localhost:3000/api-docs
```

Health APIs

* GET /health
* GET /ready
* GET /live

Analytics APIs

* GET /metrics
* GET /api/analytics

---

# Running the Project

Install dependencies

```bash
npm install
```

Start the application

```bash
npm run dev
```

---

# Docker

Build

```bash
docker build -t notification-engine .
```

Run

```bash
docker-compose up
```

---

# Running Tests

```bash
npm test
```

Coverage

```bash
npm test -- --coverage
```

Current Coverage

* Statements: 85.71%
* Functions: 91.30%

---

# Security

* Rate limiting
* Input validation using Zod
* SQL Injection prevention
* Environment variable configuration
* npm audit scanning

---

# Monitoring

* Health endpoints
* Readiness probe
* Liveness probe
* Structured logging
* Correlation IDs
* Metrics endpoint

---

# Contributors

Project developed as part of the Zetheta Backend Internship Assignment.
