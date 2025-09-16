import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as hotelControllers from '../controllers/hotel.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { hotelSchema, hotelUpdateSchema } from '../schema/hotelSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router
    .route('/')
    .get(hotelControllers.getAllHotels)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('hotel'), uploadImages, validateRequest(hotelSchema), hotelControllers.addHotel)


router.use(checkModelId('hotel'))

router
    .route('/:id')
    .get(hotelControllers.getHotel)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('hotel'), uploadImages,  validateRequest(hotelUpdateSchema), hotelControllers.updateHotel)

    .delete(protect, restrictTo(['admin']), hotelControllers.deleteHotel)

export default router;