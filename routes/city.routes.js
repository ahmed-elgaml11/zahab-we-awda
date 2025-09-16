import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as cityControllers from '../controllers/city.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { citySchema , cityUpdateSchema} from '../schema/citySchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router
    .route('/')
    .get(cityControllers.getAllCities)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('city'), uploadImages, validateRequest(citySchema), cityControllers.addCity)


router.use(checkModelId('city'))

router
    .route('/:id')
    .get(cityControllers.getCity)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),  resizePhotos('city'), uploadImages, validateRequest(cityUpdateSchema),  cityControllers.updateCity)
    
.delete(protect, restrictTo(['admin']), cityControllers.deleteCity)




export default router;