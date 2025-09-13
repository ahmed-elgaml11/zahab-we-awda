import express from 'express';
import { authenticate, optionalAuth } from '../middlewares/auth.js';
import { authorize, canManageUsers } from '../middlewares/roles.js';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus
} from '../controllers/user.controller.js';

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

// Only admins can manage users
router.get('/', canManageUsers, getUsers);
router.get('/:id', canManageUsers, getUser);
router.post('/', canManageUsers, createUser);
router.put('/:id', canManageUsers, updateUser);
router.delete('/:id', canManageUsers, deleteUser);
router.patch('/:id/status', canManageUsers, toggleUserStatus);

export default router;