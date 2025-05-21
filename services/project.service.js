import projectModel from "../models/project.model.js"
import mongoose from "mongoose";

export const  createProject = async({
    name,userId}) =>{
   
         if(!name){
            throw new Error('Project name is required')
         }
         if(!userId){
            throw new Error("User Id is required");
         }

         const project = await projectModel.create({
            name,
            users :[userId]
         })
       
         return project;
            
  }


  export const getAllProjectByUserId = async({userId}) => {
         if(!userId){
            throw new Error('UserId Required');
         }

         const allUserProjects = await projectModel.find({
            users : userId
         })

         return allUserProjects;
  }

  export const addUserToProject = async({projectId,users,userId})=>{
       
     if(!projectId){
         throw new Error("Project Id is require");
       }

       if(!mongoose.Types.ObjectId.isValid(projectId)){
         throw new Error("This is Invalid Project Id")
       }

       if(!users){
         throw new Error("Users are Required");
       }

       
    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
      throw new Error("Invalid userId's in users array")
    }

  if (!userId) {
      throw new Error("userId is required")
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId")
  } 

  const project = await projectModel.findOne({
       _id : projectId,
       users: userId
  });

  if(!project){
     throw new Error("This User Can't Add the others Because this is not belons from this Project")
  }

  const updatedProject = await projectModel.findOneAndUpdate({
    _id : projectId},{
      $addToSet :{       
          users: {
             $each : users
           }
        }
  },
    {
      new : true
    });
  return updatedProject

  }

  export const getProjectById = async({projectId})=>{
        
          if(!projectId){
              throw new Error("Project Id is required");
          }
  
        
          if (!mongoose.Types.ObjectId.isValid(projectId)) {
             throw new Error("Invalid projectId")
           }
         
           const project = await projectModel.findOne({
              _id : projectId
          }).populate('users');
           return project;
  }


  export const updateFileTree = async ({ projectId, fileTree }) => {
   if (!projectId) {
       throw new Error("projectId is required")
   }

   if (!mongoose.Types.ObjectId.isValid(projectId)) {
       throw new Error("Invalid projectId")
   }

   if (!fileTree) {
       throw new Error("fileTree is required")
   }

   const project = await projectModel.findOneAndUpdate({
       _id: projectId
   }, {
       fileTree
   }, {
       new: true
   })

   return project;
}
  