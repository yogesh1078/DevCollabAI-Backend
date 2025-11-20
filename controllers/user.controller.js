import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js"
//Ye validation karne ke liye hai
import {validationResult} from "express-validator"
import redisClient from "../services/redis.service.js";


export const createUserController = async(req,res)=>{

      //validation of request
      const errors = validationResult(req);

      if(!errors.isEmpty()){
        return res.status(401).json({errors : errors.array()});
      }

      //All ok then create the user 

      try{
            const user = await userService.createUser(req.body);
            const token = await user.generateJWT();
             delete user._doc.password;

             res.status(201).json({user,token});

      }
      catch(error){ 
               res.status(400).send(error.message)
         }

}

export const loginController = async(req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    try{

          const {email,password} = req.body;
         const user = await userModel.findOne({email}).select('+password');;
                                        //kyuki hmne password ko false kar rkha hai model mein
         if(!user){
              return res.status(401).json({
                errors : "User Not found"
              })
         }

         const  isMatch = await user.isValidPassword(password)
                                  
         if(!isMatch){
            return res.status(401).json({
                message : "Invalid Password"
            })

         }

         const token = await user.generateJWT();
         delete user._doc.password;
         return res.status(200).json({
            user,
            token,
            message : "Login Successfully"
         });

    }catch(err){
        res.status(400).send(err.message);
    }
}

export const profileController = async(req,res)=>{

     console.log(req.user);

     res.status(200).json({
        user : req.user
     })
}

export const logOutController = async(req,res)=>{
    try{
           const token = req.cookies.token || req.headers.authorization.split(' ')[1];
           redisClient.set(token,'logout','EX',60*60*24);
           
           res.status(200).json({
            message : "Logout Successfully"
           });
           
    }catch(err){
      console.log(err);
      res.status(400).send({error : err.message}); 
    }
}

export const getAllUserController = async(req,res)=>{
     
  try{ 
        const loggedInUser = await userModel.findOne({email:req.user.email})
        const allUsers = await userService.getAllUsers({userId : loggedInUser._id})
          console.log(allUsers)
        return res.status(200).json({
          allUsers
        });
  }catch(err){
                 console.log(err);
                 return res.status(400).json({error : err.message});
  }
}