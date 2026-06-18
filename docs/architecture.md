1. System Context Diagram

Financial Systems
       |
       v
Notification Engine
       |
       +--> SMS
       +--> Email
       +--> Push
       +--> WhatsApp
       +--> In-App


2. Container Diagram

API Service
Kafka
RabbitMQ
Redis
PostgreSQL
Analytics Service

3. Component Diagram

Event Ingestion
Routing Engine
Preference Engine
Template Engine
Delivery Engine
Retry Engine
DLQ
Analytics
