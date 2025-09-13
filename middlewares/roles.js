// middlewares/roles.js
import { errorResponse } from '../utils/responseHandler.js';

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
        return errorResponse(res, 'Authentication required.', 401);
        }

        if (!roles.includes(req.user.role)) {
        return errorResponse(res, 
            `Role ${req.user.role} is not authorized to access this resource.`, 
            403
        );
        }

        next();
    };
};

export const requireAdmin = authorize('admin');
export const requireModerator = authorize('moderator', 'admin');
export const requireAuth = authorize('user', 'moderator', 'admin');

export const canManageContent = (req, res, next) => {
    if (!req.user) {
        return errorResponse(res, 'Authentication required.', 401);
    }

    const allowedRoles = ['admin', 'moderator'];
    if (!allowedRoles.includes(req.user.role)) {
        return errorResponse(res, 'Insufficient permissions to manage content.', 403);
    }

    next();
};

export const canManageUsers = (req, res, next) => {
    if (!req.user) {
        return errorResponse(res, 'Authentication required.', 401);
    }

    if (req.user.role !== 'admin') {
        return errorResponse(res, 'Only administrators can manage users.', 403);
    }

    next();
};