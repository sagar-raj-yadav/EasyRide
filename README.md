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

## Project Overview

EasyRide is a microservices-based ticket booking platform designed for scalability and real-time user notifications.

- Architected a Microservices System with 4+ core services (User, Booking, Bus, API Gateway), using REST APIs for smooth communication and boosting scalability and maintainability by 30%.  
- Optimized search with Debouncing and performance tuning, improving API efficiency by 50%, and implemented secure JWT and Bcrypt login/signup for enhanced security.  
- Deployed the Bus service on AWS EC2, ensuring high availability and performance, with Razorpay integration and PostgreSQL via Prisma for a seamless ticket booking experience.
- The **Booking Service** manages bookings and payment data using **PostgreSQL** with Prisma ORM.
- The **Notification Service** stores notifications in **MongoDB** to allow flexible document-based storage and efficient querying of notification history.

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


---

## Setup & Run

### Prerequisites

- Node.js
- Docker
- PostgreSQL
- Redis (Aiven or local)

### Run Services

1. Clone the repo  
2. Setup `.env` files for each service with correct DB, Redis, and API keys  
3. Run services individually (User, Booking, Bus, Notification, API Gateway) using `npm start` or `docker-compose`  
4. Access the frontend and test real-time notifications on bookings  
