import express from 'express';
import Redis from 'ioredis';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import Notification from './models/Notification.js';
import { Server } from 'socket.io';
import cors from 'cors';


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // change this to your frontend domain in production
    methods: ["GET", "POST"],
  }
});

app.use(cors());


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Redis subscriber setup
const redisSubscriber = new Redis({
 host:'valkey-164b646d-sagarrajyadav2002-4ccc.d.aivencloud.com',
  port: 14432,
  username: 'default',
  password:  process.env.REDIS_PASSWORD,
  tls: 'true' ,
});

redisSubscriber.subscribe('booking_notifications', (err, count) => {
  if (err) {
    console.error("Failed to subscribe:", err);
  } else {
    console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
  }
});

redisSubscriber.on('message', async (channel, message) => {
  if (channel === 'booking_notifications') {
    try {
      const data = JSON.parse(message);
      console.log("Notification Service Received:", data);

      // Save notification to MongoDB
      const notification = new Notification(data);
      await notification.save();

      // Emit to clients via socket.io
      io.emit('booking_notification', data);
    } catch (error) {
      console.error("Error processing notification:", error);
    }
  }
});

// API: get notifications (latest 50)
app.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

app.get('/', (req, res) => {
  res.json('Notification service is running');
});

const PORT = process.env.PORT || 5008;
server.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
