import { v2 as cloudinary } from 'cloudinary'
export const cloudinaryConfig = () => cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const cloudinaryUploadImage = async (filePath) => {

    const data = await cloudinary.uploader.upload(filePath, {
        resource_type: 'image'
    })
    return data;
}

export const cloudinaryRemoveImage = async (imageID) => {
        const data = await cloudinary.uploader.destroy(imageID, {
            resource_type: 'image'
        })
        return data;
}