import express from 'express';
const router = express.Router();

import * as serviceControllers from '../controllers/service.controller.js'
import upload from '../middlewares/upload.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { checkModelId } from '../utils/checkDocumentExists.js';
import { serviceSchema, serviceUpdateSchema } from '../schema/serviceSchema.js';


router
    .route('/')
    .get(serviceControllers.getAllServices)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('service'), uploadImages, validateRequest(serviceSchema), serviceControllers.addService)


router.use(checkModelId('service'))

router
    .route('/:id')
    .get(serviceControllers.getService)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]), resizePhotos('service'), uploadImages, validateRequest(serviceUpdateSchema), serviceControllers.updateService)
    
    .delete(protect, restrictTo(['admin']), serviceControllers.deleteService)

export default router

