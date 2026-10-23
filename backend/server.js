import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Saare routes import kar rahe hain
import productRoutes from './routes/productsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/order.js'; // Ye line zaroori thi

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// APIs ko connect kar rahe hain
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes); // Ye line 404 error fix karegi

app.get('/', (req, res) => {
  res.send('ShopSphere API is running successfully...');
});

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server is running in mode on port ${PORT}`);
});