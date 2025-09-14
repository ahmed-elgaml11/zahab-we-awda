import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { validate } from '../utils/validators.js';
import { authValidators } from '../utils/validators.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { changePasswordSchema, loginSchema } from '../schema/userSchema.js';

const router = express.Router();

router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', protect, logout);


router.patch('/changePassword', protect, validateRequest(changePasswordSchema), changePassword)
router.get('/me', protect, getMe);


export default router;