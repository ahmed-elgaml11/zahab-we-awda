import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import * as userServices from '../services/user.service.js'


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await userServices.findUser(email)
  if (!user || user.comparePassword(password)) {
    return errorResponse(res, 401, 'Invalid credentials');
  }

  if (!user.isActive) {
    return errorResponse(res, 401, 'Account has been deactivated');
  }

  userServices.sendTokenResponse(res, 'Logged in successfully', user);
};

export const logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  successResponse(res, 200, 'Logged out successfully');
};




export const getMe = async (req, res, next) => {
    return successResponse(res, 200, 'User profile retrieved', req.user);
};

export const changePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return errorResponse(res, 'Current password is incorrect', 400);
    }

    user.password = req.body.newPassword;
    await user.save();

    successResponse(res, 200, 'Password changed successfully', undefined);
};
