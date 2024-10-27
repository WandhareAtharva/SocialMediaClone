console.log('Loaded: userNotifications.controller.js File');
import { asyncHandler } from "../utils/asyncHandler.js";
import UserNotifications from "../models/userNotifications.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userNotificationsController = {
    getNotifications: asyncHandler(async (req, res, next) => {
        const notifications = await UserNotifications.findOne({ user: req.user._id }).select('notifications');
        if (!notifications) {
            return next(ApiError.notFound('No Notifications Found'));
        }
        return res.status(200).json(new ApiResponse(200, notifications, 'Notifications Fetched'));
    }),

    updateNotificationsSettings: asyncHandler(async (req, res, next) => {
        const { emailNotifications, pushNotifications, notificationMessages } = req.body;
        if ([emailNotifications, pushNotifications, notificationMessages].every(setting => setting !== (true || false))) {
            throw ApiError(400, 'Invalid Notification Settings');
        }
        UserNotifications.emailNotifications = emailNotifications || UserNotifications.emailNotifications;
        UserNotifications.pushNotifications = pushNotifications || UserNotifications.pushNotifications;
        UserNotifications.notificationMessages = notificationMessages || UserNotifications.notificationMessages;
        await UserNotifications.save();
        return res.status(200).json(new ApiResponse(200, notifications, 'Notifications Updated'));
    }),
};

export default userNotificationsController;