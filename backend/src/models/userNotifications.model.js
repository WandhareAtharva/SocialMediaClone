import mongoose from "mongoose";

const userNotificationsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    emailNotifications: {
        type: Boolean,
        default: true,
    },
    pushNotifications: {
        type: Boolean,
        default: true,
    },
    notificationMessages: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

userNotificationsSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model("UserNotifications", userNotificationsSchema);