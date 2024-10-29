import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import PostLike from "../models/PostLike";

const postLikesController = {
    getPostLike: asyncHandler(async (req, res) => {
        const postLikes = await PostLike.findOne({tweetId: req.params.tweetId});
        if (!postLikes) {
            throw new ApiError(404, 'Post like not found');
        }
        const response = res.status(200).json(new ApiResponse(200, postLikes, 'Post like found successfully'));
        console.log('Post like found successfully');
        return response;
    }),

    createPostLike: asyncHandler(async (req, res) => {
        const postLike = await PostLike.findOne({tweetId: req.params.tweetId});
        if (postLike) {
            throw new ApiError(400, 'Post like already exists');
        }
        postLike.userId.push(req.user._id);
        await postLike.save();
        const response = res.status(201).json(new ApiResponse(201, postLike, 'Post like created successfully'));
        console.log('Post like created successfully');
        return response;
    }),

    deletePostLike: asyncHandler(async (req, res) => {
        const postLike = await PostLike.findOne({tweetId: req.params.tweetId});
        if (!postLike) {
            throw new ApiError(404, 'Post like not found');
        }
        postLike.userId.pull(req.user._id);
        await postLike.save();
        const response = res.status(200).json(new ApiResponse(200, postLike, 'Post like deleted successfully'));
        console.log('Post like deleted successfully');
        return response;
    }),
};

export default postLikesController;