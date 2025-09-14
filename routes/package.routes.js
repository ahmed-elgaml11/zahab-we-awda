import express from 'express';
import {
  getPackagesByTypeAndCountry,
  createPackage,
  getPackage,
  updatePackage,
  deletePackage
} from '../controllers/package.controller.js';

const router = express.Router();

// GET /api/packages/type/:packageTypeId/country/:countryId - Get packages by type and country
router.get('/type/:packageTypeId/country/:countryId', getPackagesByTypeAndCountry);

// POST /api/packages - Create a new package
router.post('/', createPackage);

// GET /api/packages/:slug - Get package by slug
router.get('/:slug', getPackage);

// PUT /api/packages/:id - Update a package
router.put('/:id', updatePackage);

// DELETE /api/packages/:id - Delete a package
router.delete('/:id', deletePackage);

export default router;