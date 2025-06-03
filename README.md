# 🚍 EasyRide

A scalable and secure microservices-based **Bus Booking System** that provides real-time notifications, seamless user experience, and cloud deployment using modern technologies like Docker, AWS, Redis (Aiven), Prisma, and TypeScript.



## 🛠 Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** JWT, Bcrypt
- **Deployment:** AWS EC2, Docker
- **Real-Time Communication:** Redis (Aiven), Socket.IO
- **API Gateway:** Express-based service router

---

## 🧩 Microservices Overview

| Service          | Description                                       |
|------------------|---------------------------------------------------|
| **API Gateway**   | Routes all requests to respective services        |
| **User Service**  | User login, registration, JWT auth               |
| **Bus Service**   | Manages bus listings, timings, routes            |
| **Booking Service** | Books tickets, handles Razorpay payments        |
| **Notification Service** | Sends real-time alerts via Redis + Socket.IO |

---

## 🚀 Key Features

- ✅ JWT & Bcrypt-based Secure Login/Signup
- ✅ Razorpay Integrated Payment Flow
- ✅ Microservice Architecture with API Gateway
- ✅ Redis Pub/Sub for Notifications
- ✅ Real-time Alerts via Socket.IO
- ✅ Debounced Search for Performance Boost
- ✅ Dockerized and AWS EC2 Hosted
- ✅ Prisma + PostgreSQL for DB Management

---

## 🔄 Booking to Notification Flow

### ⚙️ Architecture

```text
React → API Gateway → Booking Service → Redis Pub → Notification Service → Socket.IO → React



### How Booking Service Sends Data to Notification Service

1. **Booking Service Publishes Booking Event to Redis:**

   After a successful booking, the Booking Service publishes booking details to a Redis channel (`booking_notifications`).

2. **Notification Service Subscribes to Redis Channel:**

   The Notification Service subscribes to the Redis channel and listens for new booking messages.

3. **Notification Service Emits Real-Time Events via Socket.IO:**

   Upon receiving a message, the Notification Service emits a `new_booking` event through Socket.IO to all connected clients.

4. **Frontend React App Listens for Notifications:**

   The React frontend listens for `new_booking` events and updates the UI instantly with the new booking information.

---

### Why Use Redis & Socket.IO?

- **Redis (Aiven Managed):** Acts as a fast, reliable message broker to decouple services and enable asynchronous communication.
- **Socket.IO:** Provides real-time, bidirectional communication between the backend and frontend for instant notifications.

This setup improves scalability, maintains loose coupling between services, and enhances user engagement through real-time updates.

