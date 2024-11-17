import PostViews from '../models/postViews.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const postViewController = {
    getPostViews: asyncHandler(async (req, res) => {
        const postViews = await PostViews.find({ tweetId: req.params.tweetId });
        if (!postViews) {
            throw new ApiError(404, 'PostViews not found while fetching PostViews');
        }
        return res.status(200).json(new ApiResponse(200, postViews, "PostViews fetched successfully"));
    }),

    createPostView: asyncHandler(async (req, res) => {
        const postView = await PostViews.findOne({ tweetId: req.params.tweetId });
        if (postView) {
            postView.viewCount += 1;
            postView.userId.push(req.user._id);
            await postView.save();
            return res.status(201).json(new ApiResponse(201, postView, "PostView updated successfully"));
        } else {
            throw new ApiError(404, 'PostView not found while creating a new PostView');
        }
    }),

    deletePostView: asyncHandler(async (req, res) => {
        const postView = await PostViews.findOneAndDelete({ tweetId: req.params.tweetId });
        if (!postView) {
            throw new ApiError(404, 'PostView not found while deleting PostView');
        }
        postView.viewCount -= 1;
        postView.userId.pull(req.user._id);
        await postView.save();
        return res.status(200).json(new ApiResponse(200, postView, "PostView deleted successfully"));
    })

};

export default postViewController;