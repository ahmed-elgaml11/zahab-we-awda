import express from 'express';
import { protect } from '../middlewares/auth.js';
import * as countryControllers from '../controllers/country.controller.js'
import { checkCountryId } from '../utils/checkDocumentExists.js';
import { countrySchema , countryUpdateSchema} from '../schema/countrySchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
const router = express.Router();

router
    .route('/')
    .get(countryControllers.getAllCountries)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), validateRequest(countrySchema), countryControllers.addCountry)


router.use(checkCountryId)

router
    .route('/:id')
    .get(countryControllers.getCountry)
    .patch(protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]), validateRequest(countryUpdateSchema), resizecountryPhoto, uploadcountryImages,  countryControllers.updateCountry)
    
    .delete(protect, restrictTo(['admin']), countryControllers.deletecountry)

