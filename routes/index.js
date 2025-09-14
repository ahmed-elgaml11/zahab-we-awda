import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import packageRoutes from './package.routes.js';
import countryRoutes from './country.routes.js';
import cityRoutes from './city.routes.js';
import imageRoutes from './image.routes.js';


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/packages', packageRoutes);
router.use('/packageTypes', packageRoutes);
router.use('/countries', countryRoutes);
router.use('/cities', cityRoutes);
router.use('/hotels', cityRoutes);
router.use('/flights-booking', cityRoutes);
router.use('/airLines', cityRoutes);
router.use('/tours', cityRoutes);
router.use('/services', imageRoutes);
router.use('/blogs', imageRoutes);

export default router;