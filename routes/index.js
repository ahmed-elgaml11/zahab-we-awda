import express from 'express';

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import packageRoutes from './package.routes.js';
import countryRoutes from './country.routes.js';
import cityRoutes from './city.routes.js';
import hotelRoutes from './hotel.routes.js';
import tourRoutes from './tour.routes.js';
import airLineRoutes from './airLine.routes.js';
import serviceRoutes from './service.routes.js';
import blogRoutesRoutes from './blog.routes.js';
import flightRoutes from './flightBooking.routes.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/packages', packageRoutes);
router.use('/packageTypes', packageRoutes);
router.use('/countries', countryRoutes);
router.use('/cities', cityRoutes);
router.use('/hotels', hotelRoutes);
router.use('/flights-booking', flightRoutes);
router.use('/airLines', airLineRoutes);
router.use('/tours', tourRoutes);
router.use('/services', serviceRoutes);
router.use('/blogs', blogRoutesRoutes);

export default router;