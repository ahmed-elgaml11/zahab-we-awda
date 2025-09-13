// utils/responseHandler.js
export const successResponse = (res, message, data = null, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res, message, statusCode = 500, errors = null) => {
    res.status(statusCode).json({
        success: false,
        message,
        errors: errors || undefined
    });
};

export const validationError = (res, errors) => {
    res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors
    });
};