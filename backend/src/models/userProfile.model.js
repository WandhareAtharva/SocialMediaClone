import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    location: {
        type: String,
        trim: true,
        maxlength: 45,
    },
    website: {
        type: String,
        trim: true,
        maxlength: 45,
    },
    birthday: {
        type: Date,
    }
}, { timestamps: true });

export default mongoose.model("UserProfile", userProfileSchema);