import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (filePath, folder = 'zahab-wa-awdah') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: 'auto'
        });
        
        await fs.unlink(filePath);
        
        return {
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes
        };
    } catch (error) {
        await fs.unlink(filePath).catch(() => {});
        throw error;
    }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

export const handleImageUpload = async (file, uploadPath) => {
    if (process.env.NODE_ENV === 'production') {
        return await uploadToCloudinary(file.path);
    } else {
        const filename = path.basename(file.path);
        return {
            url: `/public/uploads/${filename}`,
            publicId: `local-${filename}`,
            format: file.mimetype.split('/')[1],
            bytes: file.size
        };
    }
};