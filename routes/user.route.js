import {Router} from "express"
import * as userController from "../controllers/user.controller.js";
import {body} from "express-validator";
import * as authMiddleware from "../middlewares/auth.middleware.js"

const router = Router();

//jo withMessage likha hai vo hi error mein show hoga aur ye controller mein 
//validate ho rha hoga 
router.post("/register",body('email').isEmail().withMessage('Email must be a valid email address'),
body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
userController.createUserController);

router.post("/login",body('email').isEmail().withMessage('Email must be a valid email address'),
body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
userController.loginController);

router.get("/profile",authMiddleware.authUser,userController.profileController);

router.get("/all",authMiddleware.authUser,userController.getAllUserController);

router.get("/logout",authMiddleware.authUser,userController.logOutController);

export default router;
