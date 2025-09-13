// controllers/countryController.js
import Country from '../models/Country.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const getCountries = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, search, isActive } = req.query;
    
    const query = {};
    
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { 'name.en': { $regex: search, $options: 'i' } },
        { 'name.ar': { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { 'name.en': 1 }
    };

    const countries = await Country.find(query)
      .populate('images', 'url altText')
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort);

    const total = await Country.countDocuments(query);

    successResponse(res, 'Countries retrieved successfully', {
      countries,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      total
    });
  } catch (error) {
    logger.error('Get countries error', error);
    next(error);
  }
};

export const getCountry = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id)
      .populate('images', 'url altText caption');

    if (!country) {
      return errorResponse(res, 'Country not found', 404);
    }

    successResponse(res, 'Country retrieved successfully', country);
  } catch (error) {
    logger.error('Get country error', error);
    next(error);
  }
};

export const createCountry = async (req, res, next) => {
  try {
    const countryData = {
      ...req.body,
      createdBy: req.user._id
    };

    const country = await Country.create(countryData);
    const populatedCountry = await Country.findById(country._id)
      .populate('images', 'url altText');

    successResponse(res, 'Country created successfully', populatedCountry, 201);
    
    logger.info('Country created', { 
      userId: req.user._id, 
      countryId: country._id,
      countryName: country.name.en
    });
  } catch (error) {
    logger.error('Create country error', error);
    next(error);
  }
};

export const updateCountry = async (req, res, next) => {
  try {
    const country = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('images', 'url altText');

    if (!country) {
      return errorResponse(res, 'Country not found', 404);
    }

    successResponse(res, 'Country updated successfully', country);
    
    logger.info('Country updated', { 
      userId: req.user._id, 
      countryId: country._id 
    });
  } catch (error) {
    logger.error('Update country error', error);
    next(error);
  }
};

export const deleteCountry = async (req, res, next) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);

    if (!country) {
      return errorResponse(res, 'Country not found', 404);
    }

    successResponse(res, 'Country deleted successfully');
    
    logger.info('Country deleted', { 
      userId: req.user._id, 
      countryId: country._id 
    });
  } catch (error) {
    logger.error('Delete country error', error);
    next(error);
  }
};

export const getActiveCountries = async (req, res, next) => {
  try {
    const countries = await Country.find({ isActive: true })
      .select('name code currency language images')
      .populate('images', 'url altText')
      .sort({ 'name.en': 1 });

    successResponse(res, 'Active countries retrieved successfully', countries);
  } catch (error) {
    logger.error('Get active countries error', error);
    next(error);
  }
};

export const toggleCountryStatus = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id);
    
    if (!country) {
      return errorResponse(res, 'Country not found', 404);
    }

    country.isActive = !country.isActive;
    await country.save();

    successResponse(res, `Country ${country.isActive ? 'activated' : 'deactivated'} successfully`, country);
    
    logger.info('Country status toggled', { 
      userId: req.user._id, 
      countryId: country._id,
      newStatus: country.isActive 
    });
  } catch (error) {
    logger.error('Toggle country status error', error);
    next(error);
  }
};


// controllers/package.controller.js - Add this function
export const getCountriesByType = async (req, res, next) => {
  try {
    const { typeId } = req.params;
    const { lang = 'en' } = req.query;

    // Get distinct country IDs that have packages of this type
    const countryIds = await Package.distinct('country', {
      packageType: typeId,
      isActive: true
    });

    if (countryIds.length === 0) {
      return successResponse(res, 'No countries found for this package type', []);
    }

    // Get country details with package count
    const countries = await Country.aggregate([
      { $match: { _id: { $in: countryIds }, isActive: true } },
      {
        $lookup: {
          from: 'packages',
          let: { countryId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$country', '$$countryId'] },
                    { $eq: ['$packageType', new mongoose.Types.ObjectId(typeId)] },
                    { $eq: ['$isActive', true] }
                  ]
                }
              }
            }
          ],
          as: 'packages'
        }
      },
      {
        $addFields: {
          packageCount: { $size: '$packages' }
        }
      },
      {
        $project: {
          [`name.${lang}`]: 1,
          code: 1,
          currency: 1,
          packageCount: 1,
          images: 1
        }
      },
      { $sort: { [`name.${lang}`]: 1 } }
    ]);

    // Populate images if needed
    const populatedCountries = await Country.populate(countries, {
      path: 'images',
      select: 'url altText'
    });

    successResponse(res, 'Countries by package type retrieved successfully', populatedCountries);
  } catch (error) {
    logger.error('Get countries by type error', error);
    next(error);
  }
};