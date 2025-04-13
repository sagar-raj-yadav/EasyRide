import  express from 'express';
import {createbookingseat,getbookingOfUser ,getbookingOfUser,cancelBooking} from '../controller/BookingController.js';
const router = express.Router();


// Create a new booking
router.post('/bookseat',createbookingseat);

// Get booking details 
router.get('/getbookedseat',getbookingOfUser );

// Get all booking for a user
router.get('/getdataByUserId/:userId',getbookingOfUser);


// Cancel booking
router.patch('/cancelbooking/:id',cancelBooking);

export default router;