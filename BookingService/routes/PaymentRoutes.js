import express from 'express';
import { createOrder } from '../controller/PaymentController.js';

const router = express.Router();
router.post("/createorder", createOrder);

export default router;
