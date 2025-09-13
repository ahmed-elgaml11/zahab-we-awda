import express from 'express';
import { protect } from '../middlewares/auth.js';
import * as hotelControllers from '../controllers/hotel.controller.js'
import { checkHotelId } from '../utils/checkDocumentExists.js';
import { hotelSchema , hotelUpdateSchema} from '../schema/hotelSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
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
        {name: 'images', maxCount: 20}
    ]), validateRequest(hotelUpdateSchema), resizehotelPhoto, uploadhotelImages,  hotelControllers.updateHotel)
    
    .delete(protect, restrictTo(['admin']), hotelControllers.deleteHotel)

