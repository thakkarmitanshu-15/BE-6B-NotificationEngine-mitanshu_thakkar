# Day 5 - User Preference System

## Objective

Implement a user preference management system with Redis caching and integrate it with the notification routing engine.

## Features Implemented

### 1. REST API

Implemented RESTful APIs for managing user preferences.

Endpoints:

* GET `/users/:id/preferences`
* PUT `/users/:id/preferences`

### 2. User Preference Storage

Created a PostgreSQL table to store user notification preferences including:

* Email
* SMS
* Push Notifications
* WhatsApp
* Digest Mode
* Language

### 3. Redis Caching

Implemented Redis caching for user preferences to reduce database access.

Features:

* Cache lookup before database query
* Cache expiry (TTL)
* Cache refresh after updates

### 4. Cache Invalidation

Whenever user preferences are updated:

* PostgreSQL is updated.
* Redis cache is deleted.
* Updated preferences are stored again in Redis.

### 5. Preference Hierarchy Resolver

Implemented preference resolution using the following hierarchy:

System Defaults
↓
Segment Preferences
↓
User Preferences
↓
Regulatory Overrides

This generates the final preference object used by the notification engine.

### 6. Routing Integration

Integrated user preferences with the routing engine.

Example:

* Routing Engine → Email, SMS, Push
* User disables Email
* Final Channels → SMS, Push

### 7. Preference Migration

Implemented automatic creation of default preferences for new users during their first access.

### 8. Digest Mode

Users can enable Digest Mode.

Instead of immediate delivery:

* Notifications are stored in the notification_digest table.
* Delivery can be performed later as a single digest.

### 9. Preference Analytics

Implemented analytics to track changes made to user preferences.

## Technologies Used

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* Redis
* Kafka

## Testing

Implemented tests for:

* Preference API
* Preference Resolver
* Redis Cache
* Cache Invalidation
* Digest Mode

## Outcome

Successfully implemented a scalable user preference management system with:

* Redis caching
* Routing integration
* Digest mode
* Preference hierarchy
* REST APIs
