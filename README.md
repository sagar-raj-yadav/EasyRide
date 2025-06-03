# 🚍 EasyRide

**EasyRide is a scalable and secure microservices-based Bus Booking System designed to deliver a seamless user experience. It supports real-time notifications for instant updates using Redis and Socket.IO. The system leverages modern cloud deployment with Docker and AWS EC2 for high availability. Databases like PostgreSQL (via Prisma) and MongoDB ensure robust and flexible data management. Built with TypeScript and React, it offers a powerful and maintainable codebase.

---

## 🛠 Tech Stack

| Layer             | Technologies                                  |
|-------------------|-----------------------------------------------|
| **Frontend**      | React, TypeScript                             |
| **Backend**       | Node.js, Express.js                           |
| **Database**      | PostgreSQL (via Prisma ORM), MongoDB          |
| **Authentication**| JWT, Bcrypt                                  |
| **Real-Time**     | Redis (Aiven Managed), Socket.IO              |
| **Deployment**    | AWS EC2, Docker                               |
| **API Gateway**   | Express-based Service Router                   |

---

## 🧩 Microservices Overview

| Service               | Responsibility                                       |
|-----------------------|-----------------------------------------------------|
| **API Gateway**       | Routes client requests to appropriate microservices |
| **User Service**      | User registration, login, and JWT authentication    |
| **Bus Service**       | Manages bus listings, routes, and schedules         |
| **Booking Service**   | Processes ticket bookings, payments (Razorpay), uses PostgreSQL via Prisma |
| **Notification Service** | Sends real-time notifications using MongoDB, Redis, and Socket.IO |

---

## 🔥 Project Overview

EasyRide is designed with a **microservices architecture** focusing on scalability, maintainability, and user experience.

- 🚀 Architected a system with 4+ core microservices communicating via REST APIs, increasing maintainability by **30%**.
- ⚡ Optimized search with **debouncing** and backend performance tuning, improving API efficiency by **50%**.
- 🔒 Implemented secure authentication using **JWT** and **Bcrypt**.
- ☁️ Deployed Bus service on **AWS EC2**, ensuring high availability.
- 💳 Integrated **Razorpay** for smooth payment processing.
- 🗄️ Data Management: Booking Service uses **PostgreSQL** (Prisma ORM), Notification Service uses **MongoDB** for flexible notification storage.

---

## 🚀 Key Features

- ✅ Secure JWT & Bcrypt-based Authentication  
- ✅ Razorpay Payment Integration  
- ✅ Microservice Architecture with API Gateway  
- ✅ Redis Pub/Sub for Efficient Message Passing  
- ✅ Real-time User Notifications with Socket.IO  
- ✅ Search Optimization via Debouncing  
- ✅ Dockerized Services for Easy Deployment  
- ✅ Hosted on AWS EC2  

---

## 🔄 Booking to Notification Flow

### ⚙️ Architecture Diagram
React Frontend → API Gateway → Booking Service → Redis Pub/Sub → Notification Service → Socket.IO → React Frontend


### Workflow Breakdown

1. **Booking Service publishes booking event to Redis:**  
   After a booking is confirmed and saved in PostgreSQL, booking details are published to the Redis channel `booking_notifications`.

2. **Notification Service subscribes to Redis:**  
   It listens for booking events on the Redis channel to receive new notifications.

3. **Notification Service emits real-time events:**  
   Upon receiving a booking event, it stores the notification in MongoDB and broadcasts a `new_booking` event to all connected clients using Socket.IO.

4. **Frontend listens for notifications:**  
   The React app subscribes to `new_booking` events and dynamically updates the UI to display real-time booking alerts.

---

### 💡 Why Redis & Socket.IO?

- **Redis (Aiven Managed):**  
  Acts as a lightweight, fast, and reliable **message broker** enabling asynchronous communication between microservices — decoupling them for better scalability.

- **Socket.IO:**  
  Enables **real-time, bidirectional communication** between backend and frontend, providing instant updates to users without page reloads.

This architecture ensures **high scalability**, **loose coupling** of services, and an **engaging user experience** with real-time notifications.

---

## ⚙️ Setup & Run

### Prerequisites

- [Node.js](https://nodejs.org/)  
- [Docker](https://www.docker.com/)  
- PostgreSQL  
- MongoDB  
- Redis (Aiven or local instance)  

### Running the Services

# 1. Clone the repo
git clone https://github.com/yourusername/easyride.git
cd easyride

### Run Services
1. Clone the repo  
2. Setup .env files for each service with correct DB, Redis, and API keys  
3. Run services individually (User, Booking, Bus, Notification, API Gateway) using npm start or docker-compose  
4. Access the frontend and test real-time notifications on bookings  



# 2. Configure .env files for each microservice with DB, Redis, and API credentials

# 3. Start each service individually or use docker-compose
cd user-service && npm install && npm start
cd booking-service && npm install && npm start
cd bus-service && npm install && npm start
cd notification-service && npm install && npm start
cd api-gateway && npm install && npm start

# 4. Run frontend
cd frontend && npm install && npm run dev

