// middlewares/auth.js
import { AppError } from '../utils/appError.js';
import { verifySignToken } from '../utils/jwt.js';
import { getOneById } from '../services/user.js';

export const protect = async (req, res, next) => {
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
        return next(new AppError('the user belonginig to this token is not exists', 401))
    }

    req.user = user

    next()

}

export const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError('you do not have permission to perform this action', 403))
        }

        next()
    }
}
