import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Маршруты для работы с задачами CRUD
router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:taskId')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
