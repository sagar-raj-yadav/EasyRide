import express from 'express';
import { searchBus, getBusById } from '../controllers/searchBusController.js';

const router = express.Router();

// Search bus route by source, destination
router.get('/searchBus', searchBus);

// Get bus by ID
router.get("/getBusById/:id",getBusById)



export default router;
