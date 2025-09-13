import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './users.routes.js';
import packageRoutes from './packages.routes.js';
import countryRoutes from './countries.routes.js';
import cityRoutes from './cities.routes.js';
import imageRoutes from './images.routes.js';


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/packages', packageRoutes);
router.use('/countries', countryRoutes);
router.use('/cities', cityRoutes);
router.use('/images', imageRoutes);

export default router;