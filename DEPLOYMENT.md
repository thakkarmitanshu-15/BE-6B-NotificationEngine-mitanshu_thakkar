# Deployment Guide

## Production Deployment Checklist

### Prerequisites

* Node.js 20+
* Docker
* Docker Compose
* PostgreSQL
* Redis
* Kafka
* RabbitMQ

---

## Environment Variables

Create a `.env` file.

Example:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=notification_engine
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123

REDIS_HOST=localhost
REDIS_PORT=6379

KAFKA_BROKER=localhost:9092

RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
```

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Run Infrastructure

```bash
docker-compose up -d
```

---

## Start Application

```bash
npm run dev
```

---

## Run Tests

```bash
npm test
```

Coverage:

```bash
npm test -- --coverage
```

---

## API Documentation

Swagger UI:

```text
http://localhost:3000/api-docs
```

---

## Health Endpoints

* GET /health
* GET /ready
* GET /live

---

## Monitoring

* Winston Logs
* Metrics Endpoint
* Analytics APIs

---

## Security

* Rate Limiting
* Zod Input Validation
* SQL Injection Protection
* Environment Variables
* npm audit

---

## Docker Deployment

Build:

```bash
docker build -t notification-engine .
```

Run:

```bash
docker-compose up
```

---

## CI/CD

GitHub Actions automatically:

* Installs dependencies
* Runs unit tests
* Generates coverage
* Builds the project

---

## Production Readiness Checklist

* Docker configured
* Health checks enabled
* Structured logging enabled
* CI/CD pipeline configured
* API documentation available
* Test coverage above 80%
* Security validation completed

Deployment is now production-ready.
