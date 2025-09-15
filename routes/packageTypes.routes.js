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