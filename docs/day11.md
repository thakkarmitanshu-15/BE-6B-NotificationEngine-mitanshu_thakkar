# Day 11 - Load Testing & Performance Optimisation

## Objective

Evaluate the performance of the notification engine under different traffic conditions and optimise system components to improve scalability, throughput, and response times.

---

## Features Implemented

### 1. Load Testing with k6

Configured k6 to simulate multiple users sending requests to the notification engine.

Load testing was performed to evaluate system behaviour under different traffic conditions.

---

### 2. Normal Load Testing

Implemented a normal traffic simulation representing everyday notification processing.

Configuration:

* 20 Virtual Users (VUs)
* 30-second execution
* Continuous HTTP requests

Purpose:

* Verify normal application behaviour
* Measure baseline latency
* Ensure system stability

---

### 3. Peak Load Testing

Implemented a peak traffic scenario representing periods of increased user activity.

Configuration:

* 100 Virtual Users (VUs)
* 1-minute execution

Purpose:

* Measure system performance under increased demand
* Identify potential bottlenecks
* Validate application scalability

---

### 4. Market Crash Simulation

Implemented a high-load scenario to simulate sudden spikes in notification traffic similar to a stock market crash.

Configuration:

* 300 Virtual Users (VUs)
* 2-minute execution

Purpose:

* Evaluate application stability during extreme traffic
* Verify high-throughput processing capability
* Measure response degradation under stress

---

### 5. Performance Metrics

Measured application response times during each load scenario.

Metrics Collected:

* Average Response Time
* P50 Latency
* P95 Latency
* P99 Latency
* Total Requests Processed

These metrics help evaluate user experience and overall system performance.

---

### 6. PostgreSQL Connection Pooling

Configured PostgreSQL connection pooling using the pg Pool.

Benefits:

* Reuses database connections
* Reduces connection overhead
* Improves database throughput
* Supports concurrent request processing

---

### 7. Redis Performance Optimisation

Optimised Redis configuration for improved performance.

Features:

* Connection reuse
* Automatic reconnection
* Reduced connection latency
* Improved cache performance

---

### 8. Kafka Consumer Parallelism

Configured Kafka consumers to process multiple partitions concurrently.

Benefits:

* Increased throughput
* Faster event processing
* Better utilisation of system resources
* Reduced processing delay

---

### 9. Database Query Optimisation

Analysed frequently executed queries using EXPLAIN ANALYZE.

Optimisations included:

* Creating indexes on frequently searched columns
* Reducing query execution time
* Improving database lookup efficiency

Example Indexes:

* event_id
* user_id
* created_at

---

### 10. Performance Benchmark Report

Documented system performance under different load conditions.

Example Benchmark Table:

| Scenario     | Virtual Users | Duration |                Requests |         Average Latency |
| ------------ | ------------: | -------: | ----------------------: | ----------------------: |
| Normal Load  |            20 |   30 sec | Measured during testing | Measured during testing |
| Peak Load    |           100 |    1 min | Measured during testing | Measured during testing |
| Market Crash |           300 |    2 min | Measured during testing | Measured during testing |

---

## Technologies Used

* Node.js
* TypeScript
* Express.js
* Kafka
* PostgreSQL
* Redis
* k6
* Jest

---

## Workflow

Client Requests

↓

k6 Load Generator

↓

Express API

↓

Kafka Event Processing

↓

Redis Cache

↓

PostgreSQL Database

↓

Performance Metrics Collection

↓

Benchmark Report

---

## Deliverables

* k6 load testing suite
* Normal load scenario
* Peak load scenario
* Market crash simulation
* PostgreSQL connection pooling
* Redis optimisation
* Kafka consumer parallelism
* Database query optimisation
* Performance benchmark report

---

## Outcome

Successfully evaluated the notification engine under multiple traffic scenarios using k6. Optimised PostgreSQL, Redis, Kafka, and database queries to improve scalability, reduce response time, and prepare the system for production-level workloads.
