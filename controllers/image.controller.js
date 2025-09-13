// controllers/imageController.js
import Image from '../models/Image.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { handleImageUpload, deleteFromCloudinary } from '../services/cloudinary.service.js';
import logger from '../utils/logger.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'Please upload an image file', 400);
    }

    const uploadResult = await handleImageUpload(req.file, 'zahab-wa-awdah/images');

    const imageData = {
      url: uploadResult.url,
      publicId: uploadResult.publicId,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
      caption: {
        en: req.body.caption_en || '',
        ar: req.body.caption_ar || ''
      },
      altText: {
        en: req.body.altText_en || '',
        ar: req.body.altText_ar || ''
      },
      uploadedBy: req.user._id,
      isFeatured: req.body.isFeatured === 'true'
    };

    const image = await Image.create(imageData);

    successResponse(res, 'Image uploaded successfully', image, 201);
    
    logger.info('Image uploaded', { 
      userId: req.user._id, 
      imageId: image._id,
      publicId: image.publicId 
    });
  } catch (error) {
    logger.error('Image upload error', error);
    next(error);
  }
};

export const getImages = async (req, res, next) => {
  try {
    const { page = 1, limit = 30, isFeatured, uploadedBy, search } = req.query;
    
    const query = {};
    
    if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';
    if (uploadedBy) query.uploadedBy = uploadedBy;
    if (search) {
      query.$or = [
        { 'caption.en': { $regex: search, $options: 'i' } },
        { 'caption.ar': { $regex: search, $options: 'i' } },
        { 'altText.en': { $regex: search, $options: 'i' } },
        { 'altText.ar': { $regex: search, $options: 'i' } }
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const images = await Image.find(query)
      .populate('uploadedBy', 'name email')
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort);

    const total = await Image.countDocuments(query);

    successResponse(res, 'Images retrieved successfully', {
      images,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      total
    });
  } catch (error) {
    logger.error('Get images error', error);
    next(error);
  }
};

export const getImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id)
      .populate('uploadedBy', 'name email');

    if (!image) {
      return errorResponse(res, 'Image not found', 404);
    }

    successResponse(res, 'Image retrieved successfully', image);
  } catch (error) {
    logger.error('Get image error', error);
    next(error);
  }
};

export const updateImage = async (req, res, next) => {
  try {
    const updates = {
      caption: {
        en: req.body.caption_en,
        ar: req.body.caption_ar
      },
      altText: {
        en: req.body.altText_en,
        ar: req.body.altText_ar
      },
      isFeatured: req.body.isFeatured
    };

    // Remove undefined values
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    const image = await Image.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('uploadedBy', 'name email');

    if (!image) {
      return errorResponse(res, 'Image not found', 404);
    }

    successResponse(res, 'Image updated successfully', image);
    
    logger.info('Image updated', { 
      userId: req.user._id, 
      imageId: image._id 
    });
  } catch (error) {
    logger.error('Update image error', error);
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return errorResponse(res, 'Image not found', 404);
    }

    // Delete from Cloudinary (if in production)
    if (process.env.NODE_ENV === 'production') {
      await deleteFromCloudinary(image.publicId);
    }

    await Image.findByIdAndDelete(req.params.id);

    successResponse(res, 'Image deleted successfully');
    
    logger.info('Image deleted', { 
      userId: req.user._id, 
      imageId: image._id,
      publicId: image.publicId 
    });
  } catch (error) {
    logger.error('Delete image error', error);
    next(error);
  }
};

export const getFeaturedImages = async (req, res, next) => {
  try {
    const images = await Image.find({ isFeatured: true })
      .select('url altText caption format width height')
      .limit(20)
      .sort({ createdAt: -1 });

    successResponse(res, 'Featured images retrieved successfully', images);
  } catch (error) {
    logger.error('Get featured images error', error);
    next(error);
  }
};

export const getUserImages = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    
    const images = await Image.find({ uploadedBy: req.user._id })
      .select('url altText caption isFeatured createdAt')
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Image.countDocuments({ uploadedBy: req.user._id });

    successResponse(res, 'User images retrieved successfully', {
      images,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    logger.error('Get user images error', error);
    next(error);
  }
};