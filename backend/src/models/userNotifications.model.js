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
    totalNotifications: {
        type: Number,
        default: 0,
    },
    notifications: [
        {
            message: {
                type: String,
                required: true,
            },
            read: {
                type: Boolean,
                default: false,
            },
            link: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });

userNotificationsSchema.index({ userId: 1 }, { unique: true });

userNotificationsSchema.pre('save', function (next) {
    this.totalNotifications = this.notifications.length;
    next();
});

userNotificationsSchema.pre('updateOne', function (next) {
    this.totalNotifications = this.notifications.length;
    next();
});

userNotificationsSchema.methods.emailNotificationsOff = function () {
    this.emailNotifications = false;
};

userNotificationsSchema.methods.pushNotificationsOff = function () {
    this.pushNotifications = false;
};

userNotificationsSchema.methods.notificationMessagesOff = function () {
    this.notificationMessages = false;
};

userNotificationsSchema.methods.emailNotificationsOn = function () {
    this.emailNotifications = true;
};

userNotificationsSchema.methods.pushNotificationsOn = function () {
    this.pushNotifications = true;
};

userNotificationsSchema.methods.notificationMessagesOn = function () {
    this.notificationMessages = true;
};

export default mongoose.model("UserNotifications", userNotificationsSchema);