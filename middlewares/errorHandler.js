import { errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error
    logger.error('Error occurred', err, {
        path: req.path,
        method: req.method,
        ip: req.ip
    });

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = errorResponse(res, message, 404);
        return;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `${field} already exists`;
        error = errorResponse(res, message, 400);
        return;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(val => ({
        field: val.path,
        message: val.message
        }));
        
        error = errorResponse(res, 'Validation failed', 422, errors);
        return;
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = errorResponse(res, 'Invalid token', 401);
        return;
    }

    if (err.name === 'TokenExpiredError') {
        error = errorResponse(res, 'Token expired', 401);
        return;
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error';

    errorResponse(res, message, statusCode);
};

export const notFound = (req, res, next) => {
    errorResponse(res, `Route not found - ${req.originalUrl}`, 404);
};

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};