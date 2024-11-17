import { asyncHandler } from "../utils/asyncHandler.js";
import UserSettings from "../models/userSettings.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userSettingsController = {

    getUserSettings: asyncHandler(async (req, res) => {
        const userSettings = await UserSettings.findOne({ user: req.user._id });
        if (!userSettings) throw new ApiError(404, 'User settings not found');

        const response = res.status(200).json(new ApiResponse(200, userSettings, 'User settings fetched successfully'));
        console.log('User settings fetched successfully');
        return response;
    }),

    updateUserSettings: asyncHandler(async (req, res) => {
        const userSettings = await UserSettings.findOne({ user: req.user._id });
        if (!userSettings) throw new ApiError(404, 'User settings not found');

        const { theme, language, country } = req.body;
        if (theme !== undefined) userSettings.theme = theme;
        if (language !== undefined) userSettings.language = language;
        if (country !== undefined) userSettings.country = country;

        await userSettings.save();

        const updatedUserSettings = await UserSettings.findOne({ user: req.user._id });

        const response = res.status(200).json(new ApiResponse(200, updatedUserSettings, 'User settings updated successfully'));
        console.log('User settings updated successfully');
        return response;
    })
}

export default userSettingsController;