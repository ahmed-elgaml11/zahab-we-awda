import fs from 'fs'
import { cloudinaryUploadImage } from '../utils/cloudinary.js'

export const uploadImages = async (req, res, next) => {
    if (!req.files)
        return next()

        if (req.files.imageCover && Array.isArray(req.files.imageCover)) {

            const result = await cloudinaryUploadImage(req.files.imageCover[0].path)
            await fs.promises.unlink(req.files.imageCover[0].path)

            req.body.imageCover = result.secure_url
        }
        if (req.files.images && Array.isArray(req.files.images)) {
            req.body.images = []
            await Promise.all(
                req.files.images.map(async file => {
                    const result = await cloudinaryUploadImage(file.path)
                    await fs.promises.unlink(file.path)

                    req.body.images.push(result.secure_url)
                })
            )
        }

    next()
}