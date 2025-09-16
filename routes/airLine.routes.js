import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as airLineControllers from '../controllers/airLine.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { airLineSchema , airLineUpdateSchema} from '../schema/airlineSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import upload from '../middlewares/upload.js';
const router = express.Router();


router
    .route('/')
    .get(airLineControllers.getAllAirlines)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('airLine'), uploadImages, validateRequest(airLineSchema), airLineControllers.addAirline)


router.use(checkModelId('airLine'))

router
    .route('/:id')
    .get(airLineControllers.getairLine)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('airLine'), uploadImages, validateRequest(airLineUpdateSchema),  airLineControllers.updateAirline)
    
    .delete(protect, restrictTo(['admin']), airLineControllers.deleteAirline)

export default router











