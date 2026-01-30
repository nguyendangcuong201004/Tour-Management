import { v2 as cloudinary } from 'cloudinary';
import streamifier from "streamifier"
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({
            resource_type: "auto"
        },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

export const uploadToCloudiary = async (buffer: Buffer): Promise<string> => {
  try {
    const result: any = await streamUpload(buffer);
    return result.secure_url || result.url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error; 
  }
};
