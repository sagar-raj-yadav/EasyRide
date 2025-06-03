# 🚍 EasyRide

A scalable, full-stack microservices-based bus booking platform that provides a seamless and secure experience for users. Built using modern technologies and optimized for performance and maintainability.

[🔴 Live Demo](#) &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;[📂 GitHub Repository](#)

---

## 🛠 Tech Stack

- **Frontend:** React.js, TypeScript
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT, Bcrypt
- **Payment Gateway:** Razorpay
- **Microservices:** User Service, Booking Service, Bus Service, Notification Service, API Gateway
- **Messaging:** Redis Pub/Sub
- **Real-time Communication:** Socket.IO
- **Containerization:** Docker
- **Deployment:** AWS EC2

---

## 🧩 Architecture Overview

EasyRide follows a microservices architecture consisting of the following services:

- **User Service:** Handles user registration, login, and profile management.
- **Bus Service:** Manages bus listings, schedules, and availability.
- **Booking Service:** Manages seat bookings, cancellations, and payment integration.
- **Notification Service:** Listens to booking events via Redis and notifies users in real time via WebSocket.
- **API Gateway:** Routes requests to the appropriate service with unified authentication and logging.

Each service communicates via REST APIs, and inter-service events (e.g., new booking) are handled via Redis Pub/Sub.

---

## 🚀 Features

- 🔐 **JWT & Bcrypt Authentication:** Secure login and signup with encrypted passwords.
- 🔄 **Microservices Communication:** REST APIs with Redis-based message brokering for decoupled communication.
- 🛎️ **Real-Time Notifications:** Socket.IO-based instant updates to the frontend for new bookings.
- ⚙️ **Debounced Search:** Smooth and efficient searching for buses with reduced API calls.
- 📦 **Prisma ORM:** Type-safe interaction with PostgreSQL.
- 🧾 **Razorpay Integration:** Secure and seamless payment for bookings.
- ☁️ **Deployed on AWS EC2:** Ensures high uptime, reliability, and scalability.

---

## 🔔 Redis + Socket.IO Notification Flow

1. **Booking Service** publishes a message to the `booking_notifications` Redis channel whenever a new booking is made.
2. **Notification Service** (Redis subscriber) listens to the channel, stores the notification in MongoDB, and emits it to connected clients using Socket.IO.
3. **Frontend** (React) listens via WebSocket and displays the real-time booking notification.

📬 Sample notification:  
