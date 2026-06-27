# Day 14 – Containerisation, CI/CD & Security

## Objective

Prepare the Event-Driven Notification Engine for production deployment by implementing containerization, continuous integration, and security best practices.

---

## Features Implemented

### 1. Multi-stage Dockerfile

Created a multi-stage Dockerfile to separate the build and runtime environments.

Stages:

* Build Stage

  * Install dependencies
  * Copy source code
  * Build application

* Production Stage

  * Install production dependencies only
  * Copy build artifacts
  * Start application

Benefits:

* Reduced image size
* Faster deployment
* Cleaner production environment

---

### 2. Docker Compose

Configured Docker Compose for the complete application stack.

Services:

* PostgreSQL
* Redis
* RabbitMQ
* Kafka

The compose configuration enables local development using a single command.

---

### 3. Health Checks

Added health checks for all infrastructure services.

Implemented for:

* PostgreSQL
* Redis
* RabbitMQ
* Kafka

Health checks ensure containers are operational before dependent services start.

---

### 4. Resource Limits

Configured CPU and memory limits for each service.

Purpose:

* Prevent excessive resource consumption
* Improve deployment stability
* Support production environments

---

### 5. Docker Test Environment

Created a dedicated `docker-compose.test.yml` configuration.

Purpose:

* Execute automated tests inside containers
* Support CI pipeline execution
* Isolate test environment

---

### 6. GitHub Actions CI/CD

Implemented a GitHub Actions workflow.

Pipeline Steps:

1. Checkout repository
2. Install Node.js
3. Install dependencies
4. Execute unit tests
5. Generate coverage report
6. Build application

The workflow automatically runs on pushes and pull requests.

---

### 7. Rate Limiting

Implemented API rate limiting using Express middleware.

Configuration:

* Maximum 100 requests per minute per client

Benefits:

* Protection against abuse
* Reduced risk of denial-of-service attacks
* Improved API stability

---

### 8. Input Validation

Incoming request data is validated before processing.

Validation is performed using Zod schemas.

Benefits:

* Prevents malformed input
* Improves API reliability
* Enhances application security

---

### 9. SQL Injection Prevention

Database queries use parameterized SQL statements.

Example:

```sql
SELECT * FROM users WHERE id = $1;
```

Benefits:

* Prevents SQL injection attacks
* Improves database security

---

### 10. Dependency Security Scan

Executed dependency scanning using:

```text
npm audit
```

Applied automatic fixes where applicable using:

```text
npm audit fix
```

---

### 11. Secret Management

Verified that sensitive configuration is stored outside the source code using environment variables.

Examples:

* Database credentials
* Kafka configuration
* Redis configuration
* SMTP credentials

---

## Technologies Used

* Docker
* Docker Compose
* GitHub Actions
* Express Rate Limit
* Zod
* npm audit
* Node.js
* TypeScript

---

## Deliverables

* Multi-stage Dockerfile
* Docker Compose configuration
* Test Docker Compose configuration
* GitHub Actions CI pipeline
* Rate limiting
* Input validation
* SQL injection protection
* Dependency security scan
* Environment-based secret management

---

## Outcome

Successfully prepared the notification engine for production deployment by implementing containerization, CI/CD automation, security hardening, health monitoring, and deployment best practices.
