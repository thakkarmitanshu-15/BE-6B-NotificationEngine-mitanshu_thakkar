# Day 2 - Event Ingestion Pipeline

## Objective

Implement a Kafka-based event ingestion pipeline for the notification engine.

## Components Implemented

### Producer

Publishes financial events to Kafka topic `financial-events`.

### Kafka Topic

Topic Name: financial-events

Purpose: Receive and distribute financial system events.

### Consumer

Consumes events from Kafka and processes them.

### PostgreSQL Persistence

Consumed events are stored in the `events` table for future routing and notification processing.

## Event Structure

```json
{
  "eventId": "evt-001",
  "eventType": "TXNX-001",
  "userId": "user-123",
  "timestamp": "2026-06-23T13:00:00Z",
  "payload": {
    "stock": "TCS",
    "quantity": 10,
    "price": 3500
  }
}
```

## Outcome

Successfully implemented an end-to-end event ingestion pipeline and persisted events into PostgreSQL.
