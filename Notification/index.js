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
    origin: "*", // ya specific origin like 'http://localhost:3000'
    methods: ["GET", "POST"]
  }
});

const redisSubscriber = new Redis({
  host: 'valkey-164b646d-sagarrajyadav2002-4ccc.d.aivencloud.com',
  port: 14432,
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  tls: {},
});

redisSubscriber.subscribe('booking_notifications', (err, count) => {
  if (err) {
    console.error("Failed to subscribe:", err);
  } else {
    console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
  }
});

redisSubscriber.on('message', (channel, message) => {
  if (channel === 'booking_notifications') {
    const data = JSON.parse(message);
    console.log("Notification Service Received:", data);

    // 🔥 Emit message to frontend via Socket.IO
    io.emit('booking_notification', data);
  }
});

app.get('/', (req, res) => {
  res.json('booking service');
});

const PORT = 5008;
server.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
