// routes/cities.js
import express from 'express';
import {
  getCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
  getCitiesByCountry,
  toggleCityStatus,
  toggleCityPopular
} from '../controllers/city.controller.js';
import { authenticate, optionalAuth } from '../middlewares/auth.js';
import { canManageContent } from '../middlewares/roles.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getCities);
router.get('/country/:countryId', getCitiesByCountry);
router.get('/:id', optionalAuth, getCity);

// Protected routes
router.use(authenticate, canManageContent);

router.post('/', createCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);
router.patch('/:id/toggle-status', toggleCityStatus);
router.patch('/:id/toggle-popular', toggleCityPopular);

export default router;