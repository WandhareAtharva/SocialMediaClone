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
        if (emailNotifications === true) UserNotifications.emailNotificationsOn()
        else UserNotifications.emailNotificationsOff();
        if (pushNotifications === true) UserNotifications.pushNotificationsOn()
        else UserNotifications.pushNotificationsOff();
        if (notificationMessages === true) UserNotifications.notificationMessagesOn()
        else UserNotifications.notificationMessagesOff();

        await UserNotifications.save();
        return res.status(200).json(new ApiResponse(200, notifications, 'Notifications Settings Updated'));
    }),

    createNotification: asyncHandler(async (req, res, next) => {
        const { message, link } = req.body;

        // Validate input
        if (!message || !link) {
            throw new ApiError(400, 'Message and link are required');
        }

        const userNotifications = await UserNotifications.findOne({ user: req.user._id });

        const notificationId = 'Note-' + req.user.username + Date.now() + Math.floor(Math.random() * 1000);

        if (!userNotifications) {
            return next(new ApiError(404, 'User Notifications not found'));
        }

        userNotifications.notifications.push({ notificationId, message, link });
        await userNotifications.save();

        return res.status(201).json(new ApiResponse(201, userNotifications, 'Notification Created'));
    }),
};

export default userNotificationsController;