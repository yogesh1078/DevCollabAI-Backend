import File from "../models/file.model.js";
import { v2 as cloudinary } from "cloudinary";


function isFileTypeSupported(fileType,supportedTypes){
    return supportedTypes.includes(fileType);
}
async function uploadFileToCloudinary(file, folder, customFileName) {
    const options = { 
        folder, 
        resource_type: "raw" 
    };
  
    // if (quality) {
    //     options.quality = quality;
    // }
  
    // Set the custom filename (Cloudinary uses 'public_id' for this)
    if (customFileName) {
        options.public_id = customFileName; 
    }
  
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

export const fileUpload = async (req, res) => {
    try { 
        // Data fetch

        console.log(res.body)

        const { name, email, tags } = req.body;
       // console.log(name, email, tags);

        const file = req.files.imageFile;
       // console.log(file);

        // Validation
        const supportedTypes = ["pdf","jpg","jpeg","mp4"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format is not supported"
            });
        }

        // File format supported
        const response = await uploadFileToCloudinary(file, "Yogesh-files",file.name);
        console.log("respons->> ", response);

        // Save entry in DB
        const filedata = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url
        });

        filedata.save();
        
        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url ,
            message: "Image uploaded successfully"
        });
    } catch (err) {
        console.log("in controller")
        console.error(err);
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
};