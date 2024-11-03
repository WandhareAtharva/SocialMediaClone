import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import FollowedRelationships from '../models/followedRelationships.model.js';

const followedRelationshipsController = {

    followUser: asyncHandler(async (req, res) => {
        // Get the userId from the JWT
        // Get the followedPersonUserId from the request params
        // Check if the user is already following the person
        // If the user is already following the person, return an error
        // If the user is not following the person, add the person to the user's following list
        // Add the user to the person's followers list
        // Save the changes to the database
        // Return a success response

        const userId = req.user._id;
        const followedPersonUserId = req.params.followedPersonUserId;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [followedPersonUserId],
                followers: []
            });
            const FollowedRelationshipsOfTheFollowedPerson = await FollowedRelationships.findOne({ userId: followedPersonUserId });
            FollowedRelationshipsOfTheFollowedPerson.followers.push(userId);
            FollowedRelationshipsOfTheFollowedPerson.followRequests.push(userId);
            await FollowedRelationshipsOfTheFollowedPerson.save();
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'User followed successfully'));
        }

        if (followedRelationship.following.includes(followedPersonUserId)) {
            throw new ApiError(400, 'User is already following this person');
        }

        followedRelationship.following.push(followedPersonUserId);
        await followedRelationship.save();

        const FollowedRelationshipsOfTheFollowedPerson = await FollowedRelationships.findOne({ userId: followedPersonUserId });
        FollowedRelationshipsOfTheFollowedPerson.followers.push(userId);
        FollowedRelationshipsOfTheFollowedPerson.followRequests.push(userId);
        await FollowedRelationshipsOfTheFollowedPerson.save();

        return res.status(200).json(new ApiResponse(200, followedRelationship, 'User followed successfully'));
    }),

    unfollowUser: asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const followedPersonUserId = req.params.followedPersonUserId;

        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'Followed Relationship didn\'t exist. Created an Empty Table. Nothing to unfollow when table is empty'));
        }

        if (!followedRelationship.following.includes(followedPersonUserId)) {
            throw new ApiError(400, 'User is not following this person');
        }

        followedRelationship.following = followedRelationship.following.filter(followedUserId => followedUserId !== followedPersonUserId);
        await followedRelationship.save();

        const FollowedRelationshipsOfTheFollowedPerson = await FollowedRelationships.findOne({ userId: followedPersonUserId });
        FollowedRelationshipsOfTheFollowedPerson.followers = FollowedRelationshipsOfTheFollowedPerson.followers.filter(followerId => followerId !== userId);
        await FollowedRelationshipsOfTheFollowedPerson.save();

        return res.status(200).json(new ApiResponse(200, followedRelationship, 'User unfollowed successfully'));
    }),

    getFollowing: asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'No users followed'));
        }

        const following = followedRelationship.following;
        return res.status(200).json(new ApiResponse(200, following, 'Following of the User'));
    }),

    getFollowers: asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'No followers'));
        }

        const followers = followedRelationship.followers;
        return res.status(200).json(new ApiResponse(200, followers, 'Followers of the user'));
    }),

    getFollowingByUserId: asyncHandler(async (req, res) => {
        const userId = req.params.userId;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'No users followed'));
        }

        const following = followedRelationship.following;
        return res.status(200).json(new ApiResponse(200, following, 'Following of the User'));
    }),

    getFollowersByUserId: asyncHandler(async (req, res) => {
        const userId = req.params.userId;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'No followers'));
        }

        const followers = followedRelationship.followers;
        return res.status(200).json(new ApiResponse(200, followers, 'Followers of the user'));
    }),

    isFollowing: asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const followedPersonUserId = req.params.followedPersonUserId;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });

        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: []
            });
            return res.status(200).json(new ApiResponse(200, false, 'Followed Relationship didn\'t exist. Created an Empty Table. User is not following anyone'));
        }

        followedRelationship.following.includes(followedPersonUserId) ?
            res.status(200).json(new ApiResponse(200, true, 'User is following this person')) :
            res.status(200).json(new ApiResponse(200, false, 'User is not following this person'));
    }),

    isFollowedBy: asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const followerUserId = req.params.followerUserId;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });

        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: []
            });
            return res.status(200).json(new ApiResponse(200, false, 'Followed Relationship didn\'t exist. Created an Empty Table. User is not following anyone'));
        }

        followedRelationship.followers.includes(followerUserId) ?
            res.status(200).json(new ApiResponse(200, true, 'User is followed by this person')) :
            res.status(200).json(new ApiResponse(200, false, 'User is not followed by this person'));
    }),

    getFollowSuggestions: asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: [],
                followRequests: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'No follow suggestions'));
        }

        const followSuggestions = await FollowedRelationships.find({
            userId: { $ne: userId },
            followers: { $ne: userId },
            followRequests: { $ne: userId },
        });

        return res.status(200).json(new ApiResponse(200, followSuggestions, 'Follow suggestions'));
    }),

    getFollowSuggestionsByUserId: asyncHandler(async (req, res) => {
        const userId = req.params.userId;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: [],
                followRequests: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'No follow suggestions'));
        }

        const followSuggestions = await FollowedRelationships.find({
            userId: { $ne: userId },
            followers: { $ne: userId },
            followRequests: { $ne: userId },
        });

        return res.status(200).json(new ApiResponse(200, followSuggestions, 'Follow suggestions'));
    }),

    getFollowRequests: asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: [],
                followRequests: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'No follow requests'));
        }
        const followRequests = followedRelationship.followRequests;

        return res.status(200).json(new ApiResponse(200, followRequests, 'Follow requests'));
    }),

    getFollowRequestsByUserId: asyncHandler(async (req, res) => {
        const userId = req.params.userId;
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            const newFollowedRelationship = await FollowedRelationships.create({
                userId: userId,
                following: [],
                followers: [],
                followRequests: []
            });
            return res.status(200).json(new ApiResponse(200, newFollowedRelationship, 'No follow requests'));
        }
        const followRequests = followedRelationship.followRequests;
        return res.status(200).json(new ApiResponse(200, followRequests, 'Follow requests'));
    }),

    acceptFollowRequest: asyncHandler(async (req, res) => {
        const userId = req.user._id; // the one who is accepting the follow request
        const followerUserId = req.params.followerUserId; // the one who sent the follow request
        // Implement logic to accept a follow request
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            throw new ApiError(400, 'Followed Relationship doesn\'t exist/not found');
        }

        if (!followedRelationship.followRequests.includes(followerUserId)) {
            throw new ApiError(400, 'No follow request from this user');
        }

        // removing followerUserId from my followRequests
        followedRelationship.followRequests = followedRelationship.followRequests.filter(id => id !== followerUserId);
        // adding followerUserId to my following
        followedRelationship.following.push(followerUserId);
        await followedRelationship.save();

        // adding my userId to the followers of the followerUserId
        const FollowedRelationshipsOfTheFollower = await FollowedRelationships.findOne({ userId: followerUserId });
        FollowedRelationshipsOfTheFollower.followers.push(userId);
        await FollowedRelationshipsOfTheFollower.save();

        const updatedFollowedRelationship = await FollowedRelationships.find({ userId: userId });

        return res.status(200).json(new ApiResponse(200, updatedFollowedRelationship, 'Follow request accepted and followed the Follower back'));
    }),

    rejectFollowRequest: asyncHandler(async (req, res) => {
        const userId = req.user._id; // the one who is rejecting the follow request
        const followerUserId = req.params.followerUserId; // the one who sent the follow request
        // Implement logic to reject a follow request
        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if (!followedRelationship) {
            throw new ApiError(400, 'Followed Relationship doesn\'t exist/not found');
        }

        if (!followedRelationship.followRequests.includes(followerUserId)) {
            throw new ApiError(400, 'No follow request from this user');
        }

        // removing followerUserId from my followRequests
        followedRelationship.followRequests = followedRelationship.followRequests.filter(id => id !== followerUserId);
        await followedRelationship.save();

        // removing my userId from the followers of the followerUserId and the following of the followerUserId
        const FollowedRelationshipsOfTheFollower = await FollowedRelationships.findOne({ userId: followerUserId });
        FollowedRelationshipsOfTheFollower.followers = FollowedRelationshipsOfTheFollower.followers.filter(id => id !== userId);
        FollowedRelationshipsOfTheFollower.following = FollowedRelationshipsOfTheFollower.following.filter(id => id !== userId);
        await FollowedRelationshipsOfTheFollower.save();

        const updatedFollowedRelationship = await FollowedRelationships.find({ userId: userId });

        return res.status(200).json(new ApiResponse(200, updatedFollowedRelationship, 'Follow request rejected'));
    }),
}

export default followedRelationshipsController;