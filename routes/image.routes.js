// routes/images.js
import express from 'express';
import {
  uploadImage,
  getImages,
  getImage,
  updateImage,
  deleteImage,
  getFeaturedImages,
  getUserImages
} from '../controllers/image.controller.js';
import { authenticate, optionalAuth } from '../middlewares/auth.js';
import { canManageContent } from '../middlewares/roles.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getImages);
router.get('/featured', getFeaturedImages);
router.get('/:id', optionalAuth, getImage);

// Protected routes
router.use(authenticate);

router.post('/upload', upload.single('image'), uploadImage);
router.get('/user/my-images', getUserImages);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);

// Admin only routes
router.use(canManageContent);
// Additional admin-only image routes can be added here

export default router;