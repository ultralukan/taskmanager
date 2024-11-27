import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IUserRequest } from '../types/Request';

// Middleware для проверки JWT-токена и защиты маршрутов
export const protect = (req: IUserRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Токена авторизации нет' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Токен не валидный' });
  }
};
