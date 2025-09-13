// controllers/userController.js
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    
    const query = {};
    
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const users = await User.find(query)
      .select('-password')
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort);

    const total = await User.countDocuments(query);

    successResponse(res, 'Users retrieved successfully', {
      users,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      total
    });
  } catch (error) {
    logger.error('Get users error', error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, 'User retrieved successfully', user);
  } catch (error) {
    logger.error('Get user error', error);
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User already exists with this email', 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    successResponse(res, 'User created successfully', user, 201);
  } catch (error) {
    logger.error('Create user error', error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, 'User updated successfully', user);
    
    logger.info('User updated by admin', { 
      adminId: req.user._id, 
      userId: user._id 
    });
  } catch (error) {
    logger.error('Update user error', error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, 'User deleted successfully');
    
    logger.info('User deleted', { 
      adminId: req.user._id, 
      userId: user._id 
    });
  } catch (error) {
    logger.error('Delete user error', error);
    next(error);
  }
};

export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    user.isActive = !user.isActive;
    await user.save();

    successResponse(res, `User ${user.isActive ? 'activated' : 'deactivated'} successfully`, user);
  } catch (error) {
    logger.error('Toggle user status error', error);
    next(error);
  }
};