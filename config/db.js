import mongoose from "mongoose";
 import { ensureAIUserExists } from "./initAIUser.js";

function dbConnect(){
   
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
         console.log("Database connection Successfully");
         ensureAIUserExists(); 
    })
    .catch((error)=>{console.log(error)});
}

export default dbConnect;