// utils/responseHandler.js
export const successResponse = (res, statusCode = 200, message = 'success', data) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res, statusCode = 200, error) => {
    res.status(statusCode).json({
        success: false,
        message,
        error
    });
};

export const validationError = (res, errors) => {
    res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors
    });
};