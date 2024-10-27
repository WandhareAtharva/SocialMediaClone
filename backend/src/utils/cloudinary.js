console.log('Loaded: cloudinary.js File');
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

console.log('CLOUDINARY_CLOUD_API:', process.env.CLOUDINARY_API_KEY);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    // console.log(`Cloudinary config: ${process.env.CLOUDINARY_CLOUD_NAME}, ${process.env.CLOUDINARY_API_KEY}, ${process.env.CLOUDINARY_API_SECRET}, ${localFilePath}`)
    // cloudinary.config({
    //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET
    // });
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log(`!!Error while uploading file on cloudinary: ${error.message}`)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteFromCloudinary = async (Url) => {
    // cloudinary.config({
    //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET
    // });
    try {
        console.log(`Deleting file from cloudinary: "${Url}"`)
        if (!Url) return null;

        const publicId = Url.split('/').pop().split('.')[0];
        const result = await cloudinary.uploader.destroy(publicId);
        // console.log('Delete result:', result);
        return result.result === 'ok';
    } catch (error) {
        console.log(`Error while deleting file from cloudinary: ${error.message}`)
        return null;

    }
}

export { uploadOnCloudinary, deleteFromCloudinary };