import "dotenv/config";
import http from "http";
import app from "./app.js"
import { Server } from "socket.io";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import projectModel from "./models/project.model.js"
import { generateResult} from "./services/ai.service.js";


const port = process.env.PORT || 3000

const server = http.createServer(app);
const io = new Server(server,{
     cors:{
          origin:'*'
     }
});

//middleware

io.use(async(socket,next) =>{

     try{
        const token = socket.handshake.auth?.token || 
        socket.handshake.headers.authorization?.split(' ')[1];

        const projectId = socket.handshake.query.projectId;

        if(!mongoose.Types.ObjectId.isValid(projectId)){
           return next(new Error('Invalid Project Id'))
        }
        
        socket.project = await projectModel.findById(projectId);
        if(!token){
          return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
          return next(new Error('Authentication error'));
        }

        socket.user = decoded;
        next();
     }catch(err){
          next(err); //will not connect if it go with error
     }
})

io.on('connection', socket => {
     socket.roomId = socket.project._id.toString();

  console.log('A user Connected with server ');
  socket.join(socket.roomId);
   
  socket.on('project-message', async data =>{
     const message = data.message;

     const aiIsPresentInMessage = message.includes('@ai');
     socket.broadcast.to(socket.roomId).emit('project-message',data);

     if(aiIsPresentInMessage){
         
           const prompt = message.replace('@ai','');
           
           const result = await generateResult(prompt);

           io.to(socket.roomId).emit('project-message',{
               message : result,
               sender : {
                    _id : "607f1f77bcf86cd799439012",
                     email : 'ai@gmail',
                     uid : Date.now()
               }

           });

           return;
     }
     // console.log(data);
    
  })

   socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { 
     console.log('User Disconnected');
     socket.leave(socket.roomId);
   });
});



server.listen(port,()=>{
     console.log(`Server is running At Port ${port}`);

});
