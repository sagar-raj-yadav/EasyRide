import express from 'express';
import Redis from 'ioredis';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",  // Ideally, restrict this to your frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Redis connection config
const redisSubscriber = new Redis({
  host: 'valkey-164b646d-sagarrajyadav2002-4ccc.d.aivencloud.com',
  port: 14432,
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  tls: {}, // enable TLS for secure connection, leave empty object as needed
});

// Listen for Redis errors
redisSubscriber.on('error', (err) => {
  console.error("Redis connection error:", err);
});

// Subscribe to Redis channel
redisSubscriber.subscribe('booking_notifications', (err, count) => {
  if (err) {
    console.error("Failed to subscribe:", err);
  } else {
    console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
  }
});

// When a message arrives on the Redis channel, emit it via Socket.IO
redisSubscriber.on('message', (channel, message) => {
  if (channel === 'booking_notifications') {
    try {
      const data = JSON.parse(message);
      console.log("Notification Service Received:", data);

      // Emit notification to all connected socket clients
      io.emit('booking_notification', data);
    } catch (error) {
      console.error("Failed to parse Redis message:", error);
    }
  }
});

// Simple health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Booking notification service is running' });
});

// Log socket connections from clients
io.on('connection', (socket) => {
  console.log("Client connected:", socket.id);

  socket.on('disconnect', () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Use dynamic port for deployment platforms like Render
const PORT = process.env.PORT || 5008;
server.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
