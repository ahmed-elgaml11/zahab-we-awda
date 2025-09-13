// middlewares/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/appError.js';
import { errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const protect = catchAsync(async (req, res, next) => {
    // 1- check if there is a token and get it
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(new AppError('Please Login to get access', 401))
    }

    // 2- verify token that it is (not tampered or expired)
    const decoded = await verifySignToken(token)


    // 3- check if the user still exists (if a customer blocked or fired or removed from the db)
    const user = await getOneById(decoded.id)
    if (!user) {
        return next(new AppError('the user beloginig to this token is not exists', 401))
    }



    // 4- check if the user changes the password after token is issued
    if (user.changePasswordAfter(decoded.iat!)) {
        return next(new AppError('User recently changed the password, please log in again', 401))
    }

    req.user = user

    next()

})

export const restrictTo = (roles: ('user' | 'guide' | 'lead-guide' | 'admin')[]) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role!)) {
            return next(new AppError('you do not have permission to perform this action', 403))
        }

        next()
    }
}
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