import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    clg: { type: String },
    verified: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
});

const userModel = mongoose.models.User || mongoose.model('User', authSchema);

export default userModel;