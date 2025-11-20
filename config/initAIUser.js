// initAIUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js'; // adjust the path as needed

export const ensureAIUserExists = async () => {
    try {
        const fixedAIUserId = new mongoose.Types.ObjectId("607f1f77bcf86cd799439012");

        const exists = await User.findOne({ _id: fixedAIUserId });
        if (!exists) {
            const hashed = await bcrypt.hash("aipassword", 10);
            const aiUser = new User({
                _id: fixedAIUserId,
                email: "ai@gmail",
                password: hashed
            });
            await aiUser.save();
            console.log("✅ AI user created with fixed ID");
        } else {
            console.log("ℹ️ AI user already exists. Skipping creation.");
        }
    } catch (err) {
        console.error("❌ Error ensuring AI user exists:", err.message);
    }
};
