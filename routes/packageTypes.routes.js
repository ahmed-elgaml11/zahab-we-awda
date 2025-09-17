import express from 'express';
const router = express.Router();
import * as packageTypeControllers from '../controllers/packageType.controller.js'
import { checkModelId, checkModelSlug } from '../utils/checkDocumentExists.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { packageTypeSchema, packageTypeUpdateSchema } from '../schema/packageTypeSchema.js';
import upload from '../middlewares/upload.js';




router.get('/:packageTypeSlug', checkModelSlug('packageType'), packageTypeControllers.getPackageTypeCountries)



router.get('/:packageTypeSlug/countries/:countrySlug', checkModelSlug('packageType'), checkModelSlug('country'), packageTypeControllers.getCountryPackages)


router.get('/:packageTypeSlug/countries/:countrySlug/packages/:packageSlug', checkModelSlug('packageType'), checkModelSlug('country'), checkModelSlug('package'), packageTypeControllers.getPackageDetails)





router
    .route('/')
    .get(packageTypeControllers.getAllPackageTypes)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('packageType'), uploadImages, validateRequest(packageTypeSchema), packageTypeControllers.addPackageType)



router
    .route('/admin/:id')
    .get( checkModelId('packageType'), packageTypeControllers.getPackageType)
    .patch( checkModelId('packageType'), protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('packageType'), uploadImages, validateRequest(packageTypeUpdateSchema),  packageTypeControllers.updatePackageType)
    
    .delete( checkModelId('packageType'), protect, restrictTo(['admin']), packageTypeControllers.deletePackageType)












export default router;