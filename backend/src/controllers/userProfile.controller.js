console.log('Loaded: userProfile.controller.js File');
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { UserProfile } from "../models/userProfile.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const userProfileController = {

    createUserProfile: asyncHandler(async (req, res) => {
        const { description, location, website, birthday } = req.body;
        if ([description, location, website, birthday].includes("")) {
            return next(new ApiError(400, "All fields are required"));
        }

        // Create User Profile
        const userProfile = await UserProfile.create({
            user: req.user._id,
            description,
            location,
            website,
            birthday,
        });

        // check if user profile was created
        const createdUserProfile = await UserProfile.findById(userProfile._id);
        if (!createdUserProfile) {
            throw new ApiError(500, "Something went wrong while creating User Profile. User Profile not created.");
        }

        const response = res.status(201).json(new ApiResponse(201, createdUserProfile, "User Profile Created"));
        console.log("User Profile Created");
        return response;
    }),

}

export default userProfileController;