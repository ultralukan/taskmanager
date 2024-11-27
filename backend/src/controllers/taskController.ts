import { Response } from 'express';
import Task from '../models/taskModel';
import { IUserRequest } from '../types/Request';

// Создание задачи
export const createTask = async (req: IUserRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, user: req.user?.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Получение задач текущего пользователя
export const getTasks = async (req: IUserRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user?.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Обновление задачи
export const updateTask = async (req: IUserRequest, res: Response): Promise<void> => {
  const { taskId } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    } 
    if (task.user.toString() !== req.user?.userId.toString()) {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }
    task.title = title;
    task.description = description;
    task.completed = completed;
    task.updatedAt = new Date()
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};


// Удаление задачи
export const deleteTask = async (req: IUserRequest, res: Response): Promise<void> => {
    const { taskId } = req.params;
    try {
      const task = await Task.findById(taskId);
  
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      if (task.user.toString() !== req.user?.userId.toString()) {
        res.status(403).json({ message: 'Not authorized' });
        return;
      }

      await Task.findByIdAndDelete(taskId);
  
      res.json({ message: 'Task deleted' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  };
