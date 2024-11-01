import PostComments from "../models/postComments.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { mongo } from "mongoose";

const postCommentsController = {

    createComment: asyncHandler(async (req, res) => {
        const { tweetId } = req.params;
        const { comment } = req.body;
        const userId = req.user._id;

        const newComment = {
            commentId: new mongo.ObjectId(),
            userId,
            comment,
        }

        const postComment = await PostComments.findOne({tweetId});
        if (!postComment) {
            const postComment = await PostComments.create({
                tweetId,
                comments: [newComment],
            });
            const createdPostComment = await postComment.findOne({ _id: postComment._id });
            if(!createdPostComment) {
                throw new ApiError(500, 'Error creating comment');
            }
            return res.status(201).json(new ApiResponse(201, createdPostComment, 'Comment created successfully'));
        }

        postComment.comments.push(newComment);
        await postComment.save();
        const response = res.status(201).json(new ApiResponse(201, postComment, 'Comment created successfully'));
        console.log('Comment created successfully');
        return response;
    }),

    getComments: asyncHandler(async (req, res) => {
        const { tweetId } = req.params;
        const postComment = await PostComments.findOne({ tweetId }).populate('comments.userId', 'username');
        if (!postComment) {
            throw new ApiError(404, 'Comments not found');
        }
        res.status(200).json(new ApiResponse(200, postComment.comments, 'Comments retrieved successfully'));
    }),

    deleteComment: asyncHandler(async (req, res) => {
        const { tweetId } = req.params;
        const { commentId } = req.body;
        const postComment = await PostComments.findOne({ tweetId });
        if (!postComment) {
            throw new ApiError(404, 'Comments not found');
        }
        postComment.comments = postComment.comments.filter(comment => comment.commentId.toString() !== commentId);
        await postComment.save();
        res.status(200).json(new ApiResponse(200, postComment, 'Comment deleted successfully'));
    }),

    updateComment: asyncHandler(async (req, res) => {
        const { tweetId } = req.params;
        const { commentId, comment } = req.body;
        const postComment = await PostComments.findOne({ tweetId });
        if (!postComment) {
            throw new ApiError(404, 'Comments not found');
        }
        const commentToUpdate = postComment.comments.find(c => c.commentId.toString() === commentId);
        if (!commentToUpdate) {
            throw new ApiError(404, 'Comment not found');
        }
        commentToUpdate.comment = comment;
        await postComment.save();
        res.status(200).json(new ApiResponse(200, postComment, 'Comment updated successfully'));
    }),

    updateLikes: asyncHandler(async (req, res) => {
        const { tweetId } = req.params;
        const { commentId } = req.body;
        const postComment = await PostComments.findOne({ tweetId });
        if (!postComment) {
            throw new ApiError(404, 'Comments not found');
        }
        const commentToUpdate = postComment.comments.find(c => c.commentId.toString() === commentId);
        if (!commentToUpdate) {
            throw new ApiError(404, 'Comment not found');
        }
        commentToUpdate.likes += 1;
        await postComment.save();
        res.status(200).json(new ApiResponse(200, postComment, 'Likes updated successfully'));
    }),

};

export default postCommentsController;