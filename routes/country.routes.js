import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as countryControllers from '../controllers/country.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { countrySchema , countryUpdateSchema} from '../schema/countrySchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import upload from '../middlewares/upload.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
const router = express.Router();

router
    .route('/')
    .get(countryControllers.getAllCountries)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('country'), uploadImages, validateRequest(countrySchema), countryControllers.addCountry)


router.use(checkModelId('country'))

router
    .route('/:id')
    .get(countryControllers.getCountry)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('country'), uploadImages, validateRequest(countryUpdateSchema),  countryControllers.updateCountry)
    
    .delete(protect, restrictTo(['admin']), countryControllers.deleteCountry)



export default router;