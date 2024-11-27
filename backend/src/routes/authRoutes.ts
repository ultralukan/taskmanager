import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();
// Маршрут для регистрации пользователя и входа
router.post('/register', register);
router.post('/login', login);

export default router;
