import * as ai from "../services/ai.service.js"

export const generateResult= async(req,res)=>{
   try{
        const {prompt} = req.body;
        const result  = await ai.generateResult(prompt);
        res.send(result);
   }catch(err){
        res.status(500).send({message : err.message});
   }
}