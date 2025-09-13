// middlewares/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const authenticate = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return errorResponse(res, 'Access denied. No token provided.', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return errorResponse(res, 'Token is no longer valid.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error', error);
    
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token.', 401);
    }
    
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired.', 401);
    }

    return errorResponse(res, 'Authentication failed.', 500);
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.isActive) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    next();
  }
};