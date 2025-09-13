import express from 'express';
import { protect } from '../middlewares/auth.js';
import * as cityControllers from '../controllers/city.controller.js'
import { checkcityId } from '../utils/checkDocumentExists.js';
import { citySchema , cityUpdateSchema} from '../schema/citySchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
const router = express.Router();

router
    .route('/')
    .get(cityControllers.getAllCities)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), validateRequest(citySchema), cityControllers.addCity)


router.use(checkcityId)

router
    .route('/:id')
    .get(cityControllers.getcity)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]), validateRequest(cityUpdateSchema), resizecityPhoto, uploadcityImages,  cityControllers.updatecity)
    
    .delete(protect, restrictTo(['admin']), cityControllers.deletecity)

