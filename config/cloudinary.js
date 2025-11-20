// Import Cloudinary
import { v2 as cloudinary } from "cloudinary";

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET,
// });

// Cloudinary connection function
export const cloudinaryConnect = () => {
   // console.log(process.env.CLOUDINARY_SECRET);

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        });
        console.log("Cloud Success")
    } catch (err) {
        console.log("error aa gaya hai")
        console.error("Cloudinary configuration error:", err);
    }
};

// Export Cloudinary instance
export default cloudinary;