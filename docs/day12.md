# Day 12 – Error Handling, Logging & Monitoring

## Objective

Improve the reliability, observability, and maintainability of the Event-Driven Notification Engine by implementing structured logging, request tracing, centralized error handling, health monitoring, and graceful shutdown mechanisms.

---

## Features Implemented

### 1. Structured JSON Logging

Integrated Winston as the application's logging framework.

Features:

* JSON formatted logs
* Timestamped log entries
* Configurable log levels
* Console transport

Benefits:

* Easier debugging
* Production-ready logging
* Integration with monitoring systems

---

### 2. Log Levels

Implemented different logging levels based on event severity.

Levels Used:

* INFO

  * Server startup
  * Notification delivery
  * Database operations

* WARN

  * Frequency cap reached
  * DND blocked notifications
  * Quiet hours
  * Duplicate events

* ERROR

  * Consumer failures
  * Processing exceptions
  * Critical system errors

---

### 3. Correlation ID

Implemented Correlation ID middleware using UUID.

Purpose:

* Assign a unique identifier to every incoming request.
* Trace a notification across multiple services.
* Simplify debugging of distributed workflows.

Each request automatically receives:

* x-correlation-id header

---

### 4. Request Logging Middleware

Implemented middleware to automatically log every incoming API request.

Captured Information:

* HTTP Method
* Request URL
* Correlation ID
* Timestamp

This provides complete visibility into API traffic.

---

### 5. Global Error Handler

Implemented centralized Express error handling.

Features:

* Captures uncaught application errors
* Returns consistent JSON error responses
* Logs detailed error information using Winston

Example Response:

```json
{
  "success": false,
  "error": "Database connection failed"
}
```

---

### 6. Health Check Endpoint

Created a monitoring endpoint.

Endpoint:

GET /health

Returns:

* Application Status
* Database Status
* Redis Status
* Kafka Status
* Timestamp

Purpose:

* Infrastructure monitoring
* Container health verification
* Load balancer checks

---

### 7. Readiness Probe

Implemented readiness endpoint.

Endpoint:

GET /ready

Purpose:

* Indicates whether the application is ready to receive traffic.
* Useful for container orchestration platforms.

Example Response:

```json
{
  "ready": true
}
```

---

### 8. Liveness Probe

Implemented liveness endpoint.

Endpoint:

GET /live

Purpose:

* Indicates whether the application process is alive.
* Enables automatic restart by orchestration platforms if the service becomes unresponsive.

Example Response:

```json
{
  "alive": true
}
```

---

### 9. Graceful Shutdown

Implemented signal handlers for:

* SIGINT
* SIGTERM

Shutdown Process:

1. Stop accepting new requests.
2. Finish processing active notifications.
3. Close database connections.
4. Close Kafka consumers.
5. Exit safely.

Benefits:

* Prevents notification loss.
* Supports zero-downtime deployments.
* Enables clean application shutdown.

---

### 10. Alerting Utility

Created a reusable alerting module for critical failures.

Used For:

* Kafka failures
* Database failures
* Redis failures
* Provider outages

Alerts are logged using Winston at the ERROR level and can be integrated with external monitoring tools.

---

## Technologies Used

* Node.js
* TypeScript
* Express.js
* Winston
* UUID
* PostgreSQL
* Redis
* Kafka

---

## Workflow

Incoming Request

↓

Correlation ID Generated

↓

Request Logger

↓

Business Logic

↓

Error Handler (if required)

↓

Structured JSON Logging

↓

Health Monitoring

↓

Graceful Shutdown Support

---

## Deliverables

* Structured JSON logging using Winston
* Correlation ID middleware
* Request logging middleware
* Global error handling
* Health check endpoint
* Readiness probe
* Liveness probe
* Graceful shutdown implementation
* Alerting utility

---

## Outcome

Successfully enhanced the notification engine with production-ready monitoring and operational capabilities. The application now supports structured logging, centralized error handling, request tracing, health monitoring, and graceful shutdown, making it easier to operate, debug, and maintain in production environments.
