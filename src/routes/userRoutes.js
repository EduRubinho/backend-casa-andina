// src/routes/userRoutes.js
import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';

const router = Router();

// GET http://localhost:3000/api/users
router.get('/', getUsers);

export default router;
