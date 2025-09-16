import express from 'express';
const router = express.Router();

import * as tourControllers from '../controllers/tour.controller.js'
import upload from '../middlewares/upload.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { checkModelId } from '../utils/checkDocumentExists.js';
import { tourSchema } from '../schema/tourSchema.js';


router
    .route('/')
    .get(tourControllers.getAllTours)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('tour'), uploadImages, validateRequest(tourSchema), tourControllers.addTour)


router.use(checkModelId('tour'))

router
    .route('/:id')
    .get(tourControllers.getTour)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('tour'), uploadImages, validateRequest(tourUpdateSchema),  tourControllers.updateTour)
    
    .delete(protect, restrictTo(['admin']), tourControllers.deleteTour)

export default router

