# Day 6 - DND Compliance & Frequency Capping

## Objective

Implement notification compliance features including DND checks, consent management, frequency capping, quiet hours, and critical event handling.

## Features Implemented

### 1. DND Registry

Created a PostgreSQL DND registry.

Each record contains:

* Phone Number
* DND Status
* Consent Status
* Updated Timestamp

### 2. Redis DND Cache

Implemented Redis caching for DND lookups.

Flow:

Redis Cache
↓
PostgreSQL
↓
Redis Update

This reduces repeated database queries.

### 3. Notification Classification

Implemented a classification engine.

Notification Types:

* TRANSACTIONAL
* PROMOTIONAL

Classification is based on event type.

Examples:

* TXNX → TRANSACTIONAL
* RISK → TRANSACTIONAL
* REGX → TRANSACTIONAL
* ALRT → PROMOTIONAL

### 4. Consent Management

Implemented immutable consent logging.

Every opt-in or opt-out action creates a new audit record instead of modifying existing records.

### 5. Frequency Capping

Implemented Redis atomic operations using INCR.

Features:

* Maximum notifications per user within a fixed time window.
* Automatic expiry using Redis TTL.

### 6. Quiet Hours

Implemented quiet hour enforcement.

Default Window:

* 10:00 PM
* 7:00 AM

Notifications generated during quiet hours are added to the digest queue.

### 7. Critical Event Bypass

Critical notifications bypass quiet hours.

Implemented:

* Immediate processing
* Audit logging in critical_event_audit table

### 8. DND Check

Implemented DND verification as the final validation before SMS delivery.

If DND is enabled:

* SMS channel is removed.
* Other channels continue normally.

### 9. Audit Trail

Critical events are stored in an audit table containing:

* Event ID
* Reason
* Timestamp

## Technologies Used

* Node.js
* TypeScript
* Kafka
* PostgreSQL
* Redis

## Testing

Implemented tests for:

* Notification Classification
* DND Lookup
* Consent Management
* Frequency Capping
* Quiet Hours
* Critical Event Bypass

Total Tests:

* 25+ compliance test cases

## Outcome

Successfully implemented a notification compliance system supporting:

* DND validation
* Consent management
* Frequency capping
* Quiet hour enforcement
* Critical event bypass
* Redis-based optimizations

