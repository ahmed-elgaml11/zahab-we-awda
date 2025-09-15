import { AppError } from "./appError.js"
import jwt from 'jsonwebtoken'
import { promisify } from 'util';


const verify = promisify(jwt.verify)

export const verifySignToken = async (token) => {
    const { JWT_SECRET } = process.env

    if (!JWT_SECRET) {
        throw new AppError('JWT env variables are not defined', 500)
    }
    try {
        const decoded = await verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        console.error('Invalid or expired token:', err.message);
        throw new AppError('Invalid or expired token', 401);
    }
}