import { fileURLToPath } from 'url';
import crypto from 'crypto'
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const resizePhotos = (modelName) => async (req, res, next) => {
    if (!req.files)
        return next()

    const uploadDir = path.join(__dirname, `../uploads/img/${modelName}`);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (req.files.imageCover && Array.isArray(req.files.imageCover)) {
        const fileName = `${modelName}-${Date.now()}-cover.jpeg`
        req.files.imageCover[0].path = path.join(__dirname, `../uploads/img/${modelName}`, fileName);
        await sharp(req.files.imageCover[0].buffer).
            resize(2000, 1333).
            toFormat('jpeg').
            jpeg({ quality: 90 }).
            toFile(req.files.imageCover[0].path)

    }
    if (req.files.images && Array.isArray(req.files.images)) {
        await Promise.all(
            req.files.images.map(async (File, i) => {
                const uniqueId = crypto.randomUUID();
                const filename = `${modelName}-${uniqueId}-${i + 1}.jpeg`
                File.path = path.join(uploadDir, filename);
                await sharp(File.buffer).
                    resize(2000, 1333).
                    toFormat('jpeg').
                    jpeg({ quality: 90 }).
                    toFile(File.path)
            })
        )
    }

    next()

}