import {Router} from "express"
import {body} from "express-validator"
import * as projectController from "../controllers/project.controller.js"
import { authUser } from "../middlewares/auth.middleware.js";
import Message from "../models/messages.model.js"
const router = Router();

router.post('/create',authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
);

router.get('/all',authUser,
     projectController.getAllProject
);

router.put('/add-user',authUser,
    body('projectId').isString().withMessage('ProjectId Required'),
body('users').isArray({min : 1}).withMessage('Users Must be an array of Strings ').bail()
.custom((users)=>users.every(user =>  typeof user === 'string')).
withMessage('Each user must be string form'),projectController.addUserToProject
);

router.get('/get-project/:projectId',authUser,projectController.getProjectById);

router.put('/update-file-tree',
    body('projectId').isString().withMessage('Project ID is required'),
    body('fileTree').isObject().withMessage('File tree is required'),
    projectController.updateFileTree
)

router.get('/messages/:projectId', async (req, res) => {
    try {
          
        const projectId = req.params.projectId;
        const cleanedProjectId = projectId.replace(":", "");
        const messages = await Message.find({projectId : cleanedProjectId})
            .populate('sender', 'email') // Populate sender details
            .sort({ timestamp: 1 }); // Sort messages by time (oldest first)
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/messages', async (req, res) => {
    const { projectId, sender, message, messageId } = req.body;

    if (!projectId || !sender || !message || !messageId) {
        return res.status(400).json({ error: "All fields are required" }); // ✅ Valid use
    }

    try {
        const newMessage = await Message.findOneAndUpdate(
            { messageId },
            { $setOnInsert: { projectId, sender, message, messageId } },
            { upsert: true, new: true }
        );

        return res.status(201).json(newMessage); // ✅ Valid use
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message }); // ✅ Valid use
    }
});


  

export default router;