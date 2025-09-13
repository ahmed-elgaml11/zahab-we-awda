// controllers/cityController.js
import City from '../models/City.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const getCities = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 50, 
      country, 
      isActive, 
      isPopular, 
      search 
    } = req.query;
    
    const query = {};
    
    if (country) query.country = country;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (isPopular !== undefined) query.isPopular = isPopular === 'true';
    if (search) {
      query.$or = [
        { 'name.en': { $regex: search, $options: 'i' } },
        { 'name.ar': { $regex: search, $options: 'i' } }
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { 'name.en': 1 }
    };

    const cities = await City.find(query)
      .populate('country', 'name code')
      .populate('images', 'url altText')
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort);

    const total = await City.countDocuments(query);

    successResponse(res, 'Cities retrieved successfully', {
      cities,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      total
    });
  } catch (error) {
    logger.error('Get cities error', error);
    next(error);
  }
};

export const getCity = async (req, res, next) => {
  try {
    const city = await City.findById(req.params.id)
      .populate('country', 'name code currency language')
      .populate('images', 'url altText caption');

    if (!city) {
      return errorResponse(res, 'City not found', 404);
    }

    successResponse(res, 'City retrieved successfully', city);
  } catch (error) {
    logger.error('Get city error', error);
    next(error);
  }
};

export const createCity = async (req, res, next) => {
  try {
    const cityData = {
      ...req.body,
      createdBy: req.user._id
    };

    const city = await City.create(cityData);
    const populatedCity = await City.findById(city._id)
      .populate('country', 'name code')
      .populate('images', 'url altText');

    successResponse(res, 'City created successfully', populatedCity, 201);
    
    logger.info('City created', { 
      userId: req.user._id, 
      cityId: city._id,
      cityName: city.name.en 
    });
  } catch (error) {
    logger.error('Create city error', error);
    next(error);
  }
};

export const updateCity = async (req, res, next) => {
  try {
    const city = await City.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('country', 'name code')
      .populate('images', 'url altText');

    if (!city) {
      return errorResponse(res, 'City not found', 404);
    }

    successResponse(res, 'City updated successfully', city);
    
    logger.info('City updated', { 
      userId: req.user._id, 
      cityId: city._id 
    });
  } catch (error) {
    logger.error('Update city error', error);
    next(error);
  }
};

export const deleteCity = async (req, res, next) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);

    if (!city) {
      return errorResponse(res, 'City not found', 404);
    }

    successResponse(res, 'City deleted successfully');
    
    logger.info('City deleted', { 
      userId: req.user._id, 
      cityId: city._id 
    });
  } catch (error) {
    logger.error('Delete city error', error);
    next(error);
  }
};

export const getCitiesByCountry = async (req, res, next) => {
  try {
    const { countryId } = req.params;
    const { isActive } = req.query;

    const query = { country: countryId };
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const cities = await City.find(query)
      .select('name coordinates isActive isPopular images')
      .populate('images', 'url altText')
      .sort({ 'name.en': 1 });

    successResponse(res, 'Cities retrieved successfully', cities);
  } catch (error) {
    logger.error('Get cities by country error', error);
    next(error);
  }
};

export const toggleCityStatus = async (req, res, next) => {
  try {
    const city = await City.findById(req.params.id);
    
    if (!city) {
      return errorResponse(res, 'City not found', 404);
    }

    city.isActive = !city.isActive;
    await city.save();

    successResponse(res, `City ${city.isActive ? 'activated' : 'deactivated'} successfully`, city);
    
    logger.info('City status toggled', { 
      userId: req.user._id, 
      cityId: city._id,
      newStatus: city.isActive 
    });
  } catch (error) {
    logger.error('Toggle city status error', error);
    next(error);
  }
};

export const toggleCityPopular = async (req, res, next) => {
  try {
    const city = await City.findById(req.params.id);
    
    if (!city) {
      return errorResponse(res, 'City not found', 404);
    }

    city.isPopular = !city.isPopular;
    await city.save();

    successResponse(res, `City ${city.isPopular ? 'marked as popular' : 'removed from popular'} successfully`, city);
    
    logger.info('City popularity toggled', { 
      userId: req.user._id, 
      cityId: city._id,
      isPopular: city.isPopular 
    });
  } catch (error) {
    logger.error('Toggle city popular error', error);
    next(error);
  }
};