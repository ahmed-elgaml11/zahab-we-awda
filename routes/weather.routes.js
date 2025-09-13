import express from 'express';
import {
  getCityWeather,
  getMultipleCitiesWeather,
  forceWeatherUpdate
} from '../controllers/weather.controller.js';
import { authenticate, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/city/:cityId', optionalAuth, getCityWeather);
router.post('/cities', optionalAuth, getMultipleCitiesWeather);

router.post('/city/:cityId/force-update', authenticate, forceWeatherUpdate);

export default router;