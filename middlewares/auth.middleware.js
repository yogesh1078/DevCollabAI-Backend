import jwt from "jsonwebtoken"
import redisClient from "../services/redis.service.js";

export const authUser = async(req,res,next)=>{
    try{
         const token = req.cookies.token || req.headers.authorization.split(' ')[1];
         console.log("Cookies : ", req.cookies.token);
         console.log("Via Header : ",req.headers.authorization.split(' ')[1]);
         console.log("HIII ")
          console.log(token);
         if(!token){
            res.staus(401).send({error : "Unauthorized User"});
         }
         
          const isBlackListed = await redisClient.get(token);

          if(isBlackListed){
                res.cookie('token','');
               return res.status(401).send({error : "Unauthorized User Token Expired"});
          }

         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         req.user = decoded;
         // console.log(decoded);
          next();

    }catch(err){
      console.log("Error aa gya")
       res.status(400).send({error: "Erorr ocurred"});
    }
}