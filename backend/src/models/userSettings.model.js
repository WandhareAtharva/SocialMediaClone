import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema({
    user: {
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
    country: {
        type: String,
        default: "india",
    },
}, { timestamps: true });

userSettingsSchema.index({ userId: 1 }, { unique: true });

userSettingsSchema.methods.toJSON = function () {
    const userSettings = this;
    const userSettingsObject = userSettings.toObject();

    delete userSettingsObject.__v;

    return userSettingsObject;
}

export default mongoose.model("UserSettings", userSettingsSchema);