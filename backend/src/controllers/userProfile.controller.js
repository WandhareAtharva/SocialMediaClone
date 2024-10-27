console.log('Loaded: userProfile.controller.js File');
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserProfile } from "../models/userProfile.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userProfileController = {

    getUserProfile: asyncHandler(async (req, res) => {
        let userProfile;
        if (req.params.id) {
            userProfile = await UserProfile.findOne({ user: req.params.id });
        } else {
            userProfile = await UserProfile.findOne({ user: req.user._id });
        }
        if (!userProfile) {
            return next(new ApiError(404, "User Profile not found"));
        }
        const response = res.status(200).json(new ApiResponse(200, userProfile, "User Profile"));
        return response;
    }),

    updateUserProfile: asyncHandler(async (req, res) => {
        const { fullName, description, location, website, birthday, gender } = req.body;
        if ([fullName, description, location, website, gender].includes("")) {
            return next(new ApiError(400, "All fields are required"));
        }

        const userProfile = await UserProfile.findOne({ user: req.user._id });
        if (!userProfile) {
            return next(new ApiError(404, "User Profile not found"));
        }

        if (fullName !== undefined) userProfile.fullName = fullName;
        if (description !== undefined) userProfile.description = description;
        if (location !== undefined) userProfile.location = location;
        if (website !== undefined) userProfile.website = website;
        if (birthday !== undefined) userProfile.birthday = birthday;
        if (gender !== undefined) userProfile.gender = gender;

        const updatedUserProfile = await userProfile.save();

        const response = res.status(201).json(new ApiResponse(201, updatedUserProfile, "User Profile Created"));
        console.log("User Profile Created");
        return response;
    }),

}

export default userProfileController;