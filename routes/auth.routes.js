import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { validate } from '../utils/validators.js';
import { authValidators } from '../utils/validators.js';

const router = express.Router();

// Public routes (no authentication)
router.post('/register', validate(authValidators.register), register);
router.post('/login', validate(authValidators.login), login);
router.post('/logout', logout);

// Protected routes (require authentication)
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, validate(authValidators.updateProfile), updateProfile);
router.put('/password', authenticate, changePassword);

export default router;