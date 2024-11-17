import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.AuthToken || req.headers('AuthToken')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(401, 'Unauthorized Access');
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select('-password -refreshToken');

        if (!user) {
            throw new ApiError(401, 'Invalid Auth Token');
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid Access Token');
    }
});

export { verifyJWT };