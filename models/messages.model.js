import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    messageId: {
        type: String,
        unique: true,         // Ensure uniqueness in MongoDB
        required: true,
        index: true           // Speeds up lookups
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
  
});

const Message = mongoose.model('message', messageSchema);
export default Message;
