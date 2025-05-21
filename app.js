import express from "express";
import morgan from "morgan" ; //show the log of routes 
import dbConnect from "./config/db.js"
import userRoutes from "./routes/user.route.js"
import projectRoutes from "./routes/project.route.js"
import aiRoutes from "./routes/ai.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import fileUpload from "express-fileupload"
import {cloudinaryConnect} from "./config/cloudinary.js"
import cloudinaryRoutes from "./routes/cloudinary.routes.js"


dbConnect();

const app = express();


//middleWares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

app.use("/users",userRoutes);
app.use("/projects",projectRoutes);
app.use("/ai",aiRoutes);


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

cloudinaryConnect();

app.use("/cloud",cloudinaryRoutes)


//default 
app.get("/",(req,res)=>{
     res.send("Hello JII");
})

export default app;