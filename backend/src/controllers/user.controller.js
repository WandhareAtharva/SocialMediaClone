import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userController = {

    generateAuthandRefreshToken: async (userId) => {
        try {
            const user = await User.findById(userId);
            const AuthToken = user.generateAuthToken();
            const RefreshToken = user.generateRefreshToken();
            console.log(`AuthToken: ${AuthToken}\nRefreshToken: ${RefreshToken}`);

            user.refreshToken = RefreshToken;
            await user.save();

            return { AuthToken, RefreshToken };
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllUsers: asyncHandler(async (req, res) => {
        const users = await User.find();
        if (!users) {
            throw new ApiError(404, "No users found!!!");
        }

        const response = res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
        console.log('All users fetched successfully!!!');
        return response;
    }),

    // Register a new user
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        // console.log(`username: ${username}\nemail: ${email}\npassword: ${password}`);

        if ([username, email, password].includes('')) {
            throw new ApiError(400, "All fields are required");
        }

        // Check if user already exists
        const userExists = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (userExists) {
            throw new ApiError(400, "User already exists");
        }

        // Create new user 
        const user = await User.create({ username, email, password });
        const createdUser = await User.findById(user._id).select("-password -refreshToken");
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while creating user!!!");
        }

        // Send response
        const response = res.status(200).json(new ApiResponse(200, createdUser, "User created successfully"));
        console.log('User Registered successfully!!');
        return response;
    }),

    // Login user
    login: asyncHandler(async (req, res) => {
        const { email, username, password } = req.body;
        console.log(`email: ${email}\nusername: ${username}\npassword: ${password}`);

        if ([email, username, password].includes('')) {
            throw new ApiError(400, "All fields are required");
        }

        // Check if user exists
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            throw new ApiError(400, "No User exists with this email or username!!!");
        }

        // Check if password is correct
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            throw new ApiError(400, "Invalid Password!!!");
        }

        // Generate token
        const { AuthToken, RefreshToken } = await userController.generateAuthandRefreshToken(user._id);
        const LoggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true,
        }

        // Send response
        const response = res
            .status(200)
            .cookie('AuthToken', AuthToken, options)
            .cookie('RefreshToken', RefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: LoggedInUser,
                        AuthToken,
                        RefreshToken
                    },
                    "User logged in successfully"
                )
            )

        console.log('User logged in successfully!!!');
        return response;
    }),

    // Logout user
    logout: asyncHandler(async (req, res) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: { refreshToken: 1 }
            },
            { new: true }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        const response = res
            .status(200)
            .clearCookie('AuthToken', options)
            .clearCookie('RefreshToken', options)
            .json(new ApiResponse(200, {}, "User logged out successfully"));

        console.log('User logged out successfully!!!');
        return response;
    }),

    // Get user profile
    getProfile: asyncHandler(async (req, res) => {

    }),

    // Update user profile
    updateProfile: asyncHandler(async (req, res) => {

    }),

    // Get all users
    getUsers: asyncHandler(async (req, res) => {

    }),

    // Delete user
    deleteUser: asyncHandler(async (req, res) => {

    }),

    // Get user by ID
    getUserById: asyncHandler(async (req, res) => {

    }),

    // Update user
    updateUser: asyncHandler(async (req, res) => {

    }),

};

export default userController;