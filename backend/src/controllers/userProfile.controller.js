console.log('Loaded: userProfile.controller.js File');
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { UserProfile } from "../models/userProfile.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const userProfileController = {

    updateUserProfile: asyncHandler(async (req, res) => {
        const {fullName, description, location, website, birthday } = req.body;
        if ([fullName, description, location, website, birthday].includes("")) {
            return next(new ApiError(400, "All fields are required"));
        }

        const response = res.status(201).json(new ApiResponse(201, createdUserProfile, "User Profile Created"));
        console.log("User Profile Created");
        return response;
    }),

}

export default userProfileController;