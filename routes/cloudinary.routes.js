import { Router } from "express";
import {fileUpload} from "../controllers/cloudinary.controller.js"

const router = Router();
router.post("/fileUpload",fileUpload);

export default router