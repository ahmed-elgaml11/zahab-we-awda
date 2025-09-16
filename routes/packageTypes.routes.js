import express from 'express';
const router = express.Router();
import * as packageTypeControllers from '../controllers/packageType.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { packageTypeSchema, packageTypeUpdateSchema } from '../schema/packageTypeSchema';



router
    .route('/')
    .get(packageTypeControllers.getAllPackageTypes)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('packageType'), uploadImages, validateRequest(packageTypeSchema), packageTypeControllers.addPackageType)


router.use(checkModelId('packageType'))

router
    .route('/:id')
    .get(packageTypeControllers.getPackageType)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('packageType'), uploadImages, validateRequest(packageTypeUpdateSchema),  packageTypeControllers.updatePackageType)
    
    .delete(protect, restrictTo(['admin']), packageTypeControllers.deletePackageType)












export default router;