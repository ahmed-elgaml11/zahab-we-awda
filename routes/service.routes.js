import express from 'express';
const router = express.Router();

import * as serviceControllers from '../controllers/service.controller.js'
import upload from '../middlewares/upload.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { checkModelId } from '../utils/checkDocumentExists.js';

// tourSchema 
// tourUpdateSchema

router
    .route('/')
    .get(serviceControllers.getAllServices)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('tour'), uploadImages, validateRequest(tourSchema), serviceControllers.addTour)


router.use(checkModelId('tour'))

router
    .route('/:id')
    .get(serviceControllers.getTour)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('tour'), uploadImages, validateRequest(tourUpdateSchema),  serviceControllers.updateTour)
    
    .delete(protect, restrictTo(['admin']), serviceControllers.deleteTour)

export default router

