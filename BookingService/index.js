import  express from 'express';
import cors from 'cors';
import BookingRoutes from './routes/Bookingroutes.js';
import PaymentRoutes from './routes/PaymentRoutes.js';


const app = express();
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.json('booking service');
});


app.use('/api/payment', PaymentRoutes);


app.use('/api',BookingRoutes);

app.listen(5003, () => {
  console.log('Server is running on port 5003');
});
