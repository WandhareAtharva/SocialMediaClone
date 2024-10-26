import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
    },
    language: {
        type: String,
        enum: ["english", "spanish"],
        default: "english",
    },
    coutnry: {
        type: String,
        default: "india",
    },
}, { timestamps: true });

export default mongoose.model("UserSettings", userSettingsSchema);