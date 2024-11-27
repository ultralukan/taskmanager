import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// поддержка CORS
app.use(cors({
    origin: 'http://localhost:3000',
}));
  
// Подключение к базе данных MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// настройка маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Запуск сервера
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
