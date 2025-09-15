import express from 'express';
const router = express.Router();




router
    .route('/')
    .get(countryControllers.getAllCountries)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('country'), uploadImages, validateRequest(countrySchema), countryControllers.addCountry)


router.use(checkModelId)

router
    .route('/:id')
    .get(countryControllers.getCountry)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('country'), uploadImages, validateRequest(countryUpdateSchema),  countryControllers.updateCountry)
    
    .delete(protect, restrictTo(['admin']), countryControllers.deleteCountry)













export default router;





// // routes/packages.js
// import express from 'express';
// import {
//   getPackageTypes,
//   getCountriesByType,
//   getPackagesByType,
//   getPackagesByCountry,
//   getPackagesByCity,
//   getPackageDetail,
//   getFeaturedPackages,
//   getPackages,
//   createPackage,
//   updatePackage,
//   deletePackage,
//   getPackageJourney,
//   getPackageStats,
//   searchPackages
// } from '../controllers/package.controller.js';
// import { authenticate } from '../middlewares/auth.js';
// import { canManageContent } from '../middlewares/roles.js';

// const router = express.Router();

// // Public routes - User Journey
// router.get('/types', getPackageTypes);
// router.get('/types/:typeId/countries', getCountriesByType);
// router.get('/types/:typeId/countries/:countryId/packages', getPackageJourney);
// router.get('/types/:typeId/packages', getPackagesByType);
// router.get('/countries/:countryId/packages', getPackagesByCountry);
// router.get('/cities/:cityId/packages', getPackagesByCity);
// router.get('/featured', getFeaturedPackages);
// router.get('/search', searchPackages);
// router.get('/:idOrSlug', getPackageDetail);
// router.get('/', getPackages);

// // Protected admin routes
// router.use(authenticate, canManageContent);
// router.get('/stats/overview', getPackageStats);
// router.post('/', createPackage);
// router.put('/:id', updatePackage);
// router.delete('/:id', deletePackage);

// export default router;