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
