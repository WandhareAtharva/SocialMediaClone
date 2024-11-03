import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
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
        await FollowedRelationshipsOfTheFollowedPerson.save();

        return res.status(200).json(new ApiResponse(200, followedRelationship, 'User followed successfully'));
    }),

    unfollowUser: asyncHandler(async (req, res) => {
        const userId = req.user._id;
        const followedPersonUserId = req.params.followedPersonUserId;

        const followedRelationship = await FollowedRelationships.findOne({ userId: userId });
        if(!followedRelationship) {
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

}

export default followedRelationshipsController;