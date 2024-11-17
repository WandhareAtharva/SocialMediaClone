import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Favorite from "../models/favorites.model.js";

const favoritesController = {
    add: asyncHandler(async (req, res) => {
        const { tweetId } = req.params;
        const userId = req.user._id;
        if (!tweetId) throw new ApiError(400, 'Tweet ID is required');
        if (!userId) throw new ApiError(400, 'User ID is required');

        const favorite = await Favorite.findOne({ userId });
        if (!favorite) {
            const newFavorite = Favorite.create({ userId, tweetId });
            if (!newFavorite) throw new ApiError(500, 'Failed to create favorite');
            return res.status(201).json(new ApiResponse(201, newFavorite, 'Favorites created and added successfully'));
        }
        favorite.tweetId.push(tweetId);
        await favorite.save();
        return res.status(200).json(new ApiResponse(200, favorite, 'Favorite added successfully'));
    }),

    remove: asyncHandler(async (req, res) => {
        const { tweetId } = req.params;
        const userId = req.user._id;
        if (!tweetId) throw new ApiError(400, 'Tweet ID is required');
        if (!userId) throw new ApiError(400, 'User ID is required');

        const favorite = await Favorite.findOne({ userId });
        if (!favorite) {
            const newFavorite = Favorite.create({ userId });
            if (!newFavorite) throw new ApiError(500, 'Failed to create favorite');
            return res.status(201).json(new ApiResponse(201, newFavorite, 'Favorites created and added successfully'));
        }
        favorite.tweetId.pull(tweetId);
        await favorite.save();
        return res.status(200).json(new ApiResponse(200, favorite, 'Favorite removed successfully'));
    })
};

export default favoritesController;