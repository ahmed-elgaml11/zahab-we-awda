import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const register = async (req, res, next) => {
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

    sendTokenResponse(user, 201, res, 'User registered successfully');
    
    logger.info('User registered successfully', { userId: user._id, email: user.email });
  } catch (error) {
    logger.error('Registration error', error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      return errorResponse(res, 'Account has been deactivated', 401);
    }

    sendTokenResponse(user, 200, res, 'Logged in successfully');
  } catch (error) {
    logger.error('Login error', error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    successResponse(res, 'Logged out successfully');
  } catch (error) {
    logger.error('Logout error', error);
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    successResponse(res, 'User profile retrieved', req.user);
  } catch (error) {
    logger.error('Get profile error', error);
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    successResponse(res, 'Profile updated successfully', user);
  } catch (error) {
    logger.error('Update profile error', error);
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    
    // Check current password
    const isMatch = await user.comparePassword(req.body.currentPassword);
    if (!isMatch) {
      return errorResponse(res, 'Current password is incorrect', 400);
    }

    user.password = req.body.newPassword;
    await user.save();

    successResponse(res, 'Password changed successfully');
  } catch (error) {
    logger.error('Change password error', error);
    next(error);
  }
};

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message,
    token,
    data: user
  });
};