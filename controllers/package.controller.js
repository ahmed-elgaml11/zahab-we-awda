// controllers/package.controller.js
import mongoose from 'mongoose';
import Package from '../models/Package.js';
import PackageType from '../models/PackageType.js';
import Country from '../models/Country.js';
import City from '../models/City.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

// Light population for list views
const lightPopulation = [
  { path: 'country', select: 'name code' },
  { path: 'city', select: 'name' },
  { path: 'packageType', select: 'name color' },
  { path: 'coverImage', select: 'url altText' }
];

// Heavy population for detail views
const heavyPopulation = [
  { path: 'country', select: 'name code currency language timezone' },
  { path: 'city', select: 'name description coordinates timezone' },
  { path: 'packageType', select: 'name description color' },
  { path: 'images', select: 'url altText caption' },
  { path: 'coverImage', select: 'url altText' }
];

// PACKAGE TYPES CONTROLLERS
export const getPackageTypes = async (req, res, next) => {
  try {
    const packageTypes = await PackageType.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .populate('images', 'url altText')
      .select('name description icon color images');

    successResponse(res, 'Package types retrieved successfully', packageTypes);
  } catch (error) {
    logger.error('Get package types error:', error);
    next(error);
  }
};

export const getCountriesByType = async (req, res, next) => {
  try {
    const { typeId } = req.params;

    // Validate typeId
    if (!mongoose.Types.ObjectId.isValid(typeId)) {
      return errorResponse(res, 'Invalid package type ID', 400);
    }

    // Verify package type exists
    const packageType = await PackageType.findById(typeId);
    if (!packageType) {
      return errorResponse(res, 'Package type not found', 404);
    }

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
      { 
        $match: { 
          _id: { $in: countryIds }, 
          isActive: true 
        } 
      },
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
            },
            { $count: 'count' }
          ],
          as: 'packageInfo'
        }
      },
      {
        $addFields: {
          packageCount: { 
            $ifNull: [{ $arrayElemAt: ['$packageInfo.count', 0] }, 0] 
          }
        }
      },
      {
        $project: {
          name: 1,
          code: 1,
          currency: 1,
          packageCount: 1,
          images: 1
        }
      },
      { $sort: { name: 1 } }
    ]);

    // Populate images
    const populatedCountries = await Country.populate(countries, {
      path: 'images',
      select: 'url altText'
    });

    successResponse(res, 'Countries by package type retrieved successfully', populatedCountries);
  } catch (error) {
    logger.error('Get countries by type error:', error);
    next(error);
  }
};

// PACKAGES BY LOCATION CONTROLLERS
export const getPackagesByType = async (req, res, next) => {
  try {
    const { typeId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    // Validate typeId
    if (!mongoose.Types.ObjectId.isValid(typeId)) {
      return errorResponse(res, 'Invalid package type ID', 400);
    }

    const query = { 
      packageType: typeId, 
      isActive: true 
    };

    const packages = await Package.find(query)
      .populate(lightPopulation)
      .select('title shortDescription price originalPrice duration durationType isOnSale slug')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Package.countDocuments(query);

    successResponse(res, 'Packages by type retrieved successfully', {
      packages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total
      }
    });
  } catch (error) {
    logger.error('Get packages by type error:', error);
    next(error);
  }
};

export const getPackagesByCountry = async (req, res, next) => {
  try {
    const { countryId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    // Validate countryId
    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      return errorResponse(res, 'Invalid country ID', 400);
    }

    const query = { 
      country: countryId, 
      isActive: true 
    };

    const packages = await Package.find(query)
      .populate(lightPopulation)
      .select('title shortDescription price originalPrice duration durationType isOnSale slug')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Package.countDocuments(query);

    successResponse(res, 'Packages by country retrieved successfully', {
      packages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total
      }
    });
  } catch (error) {
    logger.error('Get packages by country error:', error);
    next(error);
  }
};

export const getPackagesByCity = async (req, res, next) => {
  try {
    const { cityId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    // Validate cityId
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return errorResponse(res, 'Invalid city ID', 400);
    }

    const query = { 
      city: cityId, 
      isActive: true 
    };

    const packages = await Package.find(query)
      .populate(lightPopulation)
      .select('title shortDescription price originalPrice duration durationType isOnSale slug')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Package.countDocuments(query);

    successResponse(res, 'Packages by city retrieved successfully', {
      packages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total
      }
    });
  } catch (error) {
    logger.error('Get packages by city error:', error);
    next(error);
  }
};

// PACKAGE DETAILS CONTROLLERS
export const getPackageDetail = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    // Check if it's a valid ObjectId
    const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
    
    let query;
    if (isObjectId) {
      query = { _id: idOrSlug, isActive: true };
    } else {
      query = { slug: idOrSlug, isActive: true };
    }

    const pkg = await Package.findOne(query)
      .populate(heavyPopulation);

    if (!pkg) {
      return errorResponse(res, 'Package not found', 404);
    }

    successResponse(res, 'Package details retrieved successfully', pkg);
  } catch (error) {
    logger.error('Get package detail error:', error);
    next(error);
  }
};

// FEATURED & SEARCH CONTROLLERS
export const getFeaturedPackages = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const featuredPackages = await Package.find({ 
      isFeatured: true, 
      isActive: true 
    })
      .populate(lightPopulation)
      .select('title shortDescription price originalPrice duration durationType isOnSale slug')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    successResponse(res, 'Featured packages retrieved successfully', featuredPackages);
  } catch (error) {
    logger.error('Get featured packages error:', error);
    next(error);
  }
};

export const getPackages = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      country, 
      city, 
      packageType, 
      minPrice, 
      maxPrice,
      isFeatured,
      search
    } = req.query;

    const query = { isActive: true };

    // Add filters
    if (country) query.country = country;
    if (city) query.city = city;
    if (packageType) query.packageType = packageType;
    if (isFeatured) query.isFeatured = isFeatured === 'true';
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } }
      ];
    }

    const packages = await Package.find(query)
      .populate(lightPopulation)
      .select('title shortDescription price originalPrice duration durationType isOnSale slug')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Package.countDocuments(query);

    successResponse(res, 'Packages retrieved successfully', {
      packages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total
      }
    });
  } catch (error) {
    logger.error('Get packages error:', error);
    next(error);
  }
};

// ADMIN CRUD CONTROLLERS
export const createPackage = async (req, res, next) => {
  try {
    const packageData = {
      ...req.body,
      createdBy: req.user._id
    };

    const newPackage = await Package.create(packageData);
    
    const populatedPackage = await Package.findById(newPackage._id)
      .populate('country', 'name')
      .populate('city', 'name')
      .populate('packageType', 'name');

    successResponse(res, 'Package created successfully', populatedPackage, 201);
    
    logger.info('Package created', { 
      userId: req.user._id, 
      packageId: newPackage._id 
    });
  } catch (error) {
    logger.error('Create package error:', error);
    next(error);
  }
};

export const updatePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('country', 'name')
      .populate('city', 'name')
      .populate('packageType', 'name');

    if (!pkg) {
      return errorResponse(res, 'Package not found', 404);
    }

    successResponse(res, 'Package updated successfully', pkg);
    
    logger.info('Package updated', { 
      userId: req.user._id, 
      packageId: pkg._id 
    });
  } catch (error) {
    logger.error('Update package error:', error);
    next(error);
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!pkg) {
      return errorResponse(res, 'Package not found', 404);
    }

    successResponse(res, 'Package deleted successfully');
    
    logger.info('Package soft deleted', { 
      userId: req.user._id, 
      packageId: pkg._id 
    });
  } catch (error) {
    logger.error('Delete package error:', error);
    next(error);
  }
};

// USER JOURNEY CONTROLLERS (Based on PDF flow)
export const getPackageJourney = async (req, res, next) => {
  try {
    const { typeId, countryId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(typeId) || !mongoose.Types.ObjectId.isValid(countryId)) {
      return errorResponse(res, 'Invalid type or country ID', 400);
    }

    const query = { 
      packageType: typeId,
      country: countryId,
      isActive: true 
    };

    const packages = await Package.find(query)
      .populate(lightPopulation)
      .select('title shortDescription price originalPrice duration durationType isOnSale slug coverImage')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Package.countDocuments(query);

    // Get package type and country info for the journey
    const [packageType, country] = await Promise.all([
      PackageType.findById(typeId).select('name'),
      Country.findById(countryId).select('name')
    ]);

    successResponse(res, 'Package journey retrieved successfully', {
      packageType: packageType || {},
      country: country || {},
      packages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total
      }
    });
  } catch (error) {
    logger.error('Get package journey error:', error);
    next(error);
  }
};

// UTILITY FUNCTIONS
export const getPackageStats = async (req, res, next) => {
  try {
    const stats = await Package.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalPackages: { $sum: 1 },
          totalFeatured: { $sum: { $cond: ['$isFeatured', 1, 0] } },
          averagePrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);

    successResponse(res, 'Package statistics retrieved successfully', stats[0] || {});
  } catch (error) {
    logger.error('Get package stats error:', error);
    next(error);
  }
};

export const searchPackages = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q) {
      return errorResponse(res, 'Search query is required', 400);
    }

    const query = {
      isActive: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { shortDescription: { $regex: q, $options: 'i' } }
      ]
    };

    const packages = await Package.find(query)
      .populate(lightPopulation)
      .select('title shortDescription price originalPrice duration durationType isOnSale slug')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Package.countDocuments(query);

    successResponse(res, 'Packages search results retrieved successfully', {
      query: q,
      packages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total
      }
    });
  } catch (error) {
    logger.error('Search packages error:', error);
    next(error);
  }
};