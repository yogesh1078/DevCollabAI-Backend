import projectModel from "../models/project.model.js"
import * as projectService from "../services/project.service.js"
import { validationResult } from "express-validator"
import userModel from "../models/user.model.js"

export const createProject = async (req, res) => {
    // const AI_USER_ID = "607f1f77bcf86cd799439012";
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { name } = req.body;
      console.log(req.user)
      const isLoggedIn = await userModel.findOne({ email: req.user.email });
      console.log(isLoggedIn);
      const userId = isLoggedIn._id;
  
      // Step 1: Create project with userId
      const newProject = await projectService.createProject({ name, userId });
  
    //   await projectModel.findByIdAndUpdate(
    //     newProject._id,
    //     {
    //         $addToSet: { users: { $each: [userId, AI_USER_ID] } }
    //     },
    //     { new: true }
    // );
    

  
      return res.status(201).json({ newProject });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  };
  

export const getAllProject = async(req,res)=>{
       try{
        const loggedInUser = await userModel.findOne({email : req.user.email})
          
        console.log(loggedInUser)
        const allUserProjects = await projectService.getAllProjectByUserId({
            userId : loggedInUser._id
        });

        return res.status(200).json({
            projects : allUserProjects
        })
       }catch(err){
         console.log(err);
         res.status(400).json({error : err.message})
       }
}

export const addUserToProject = async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({errors : errors.array()});
    }

    try{
         const {projectId,users} = req.body;
         const loggedInUser = await userModel.findOne({
            email : req.user.email
         });

         const project = await projectService.addUserToProject({
            projectId,
            users,
            userId: loggedInUser._id})

        return res.status(200).json({
            project
        });

    }catch(err){
        console.log(err)
        res.status(400).json({error:err.message});
    }
}

export const getProjectById = async(req,res)=>{
       const {projectId} = req.params;
       

       try{
             const project = await projectService.getProjectById({projectId});

              return res.status(200).json({
                 project
              })
       }catch(err){
          console.log(err);
         return res.status(400).json({error : err.message});
       }
}

export const updateFileTree = async (req, res) => {
  const errors = validationResult(req);

  console.log("FILE TREE UPDATION CALL");

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {

      const { projectId, fileTree } = req.body;

      const project = await projectService.updateFileTree({
          projectId,
          fileTree
      })

      return res.status(200).json({
          project
      })

  } catch (err) {
      console.log(err)
      res.status(400).json({ error: err.message })
  }

}
