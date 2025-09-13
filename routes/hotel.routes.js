import express from 'express';
import { authenticate, optionalAuth } from '../middlewares/auth.js';
import * as hotelControllers from '../controllers/hotel.controller.js'
import { checkHotelId } from '../utils/checkDocumentExists.js';
import { hotelSchema } from '../schema/hotelSchema.js';
const router = express.Router();

router
    .route('/')
    .get(hotelControllers.getAllHotels)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), validateRequest(hotelSchema), hotelControllers.addHotel)


router.use(checkHotelId)

router
    .route('/:id')
    .get(hotelControllers.getHotel)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 3}
    ]), validateRequest(hotelSchema, ['params', 'halfBody']), resizehotelPhoto, uploadhotelImages,  hotelControllers.updatehotel)
    
    .delete(protect,  restrictTo(['admin', 'lead-guide']), validateRequest(hotelSchema, ['params']),  hotelControllers.deletehotel)

