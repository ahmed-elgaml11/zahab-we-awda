// routes/countries.js
import express from 'express';
import {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
  getActiveCountries,
  toggleCountryStatus
} from '../controllers/country.controller.js';
import { authenticate, optionalAuth } from '../middlewares/auth.js';
import { canManageContent } from '../middlewares/roles.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getCountries);
router.get('/active', getActiveCountries);
router.get('/:id', optionalAuth, getCountry);

// Protected routes
router.use(authenticate, canManageContent);

router.post('/', createCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);
router.patch('/:id/toggle-status', toggleCountryStatus);

export default router;