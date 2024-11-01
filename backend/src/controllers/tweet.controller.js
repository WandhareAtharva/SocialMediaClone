console.log('Loaded: tweet.controller.js File');
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import Tweet from "../models/tweet.model";
import PostViews from "../models/postViews.model";
import PostLikes from "../models/postLikes.model";
import PostComments from "../models/postComments.model";

const tweetController = {

    getTweetsById: asyncHandler(async (req, res) => {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) {
            throw new ApiError(404, "Tweet not found");
        }

        const response = res.status(200).json(new ApiResponse(200, tweet, "Tweet found successfully"));
        console.log('Tweet found successfully');
        return response;
    }),

    getTweetsByQuery: asyncHandler(async (req, res) => {
        const tweets = await Tweet.find({
            $or: [
                { text: { $regex: req.query.q, $options: "i" } },
                { country: { $regex: req.query.q, $options: "i" } },
                { language: { $regex: req.query.q, $options: "i" } },
                { createdAt: { $regex: req.query.q, $options: "i" } },
                { user: { $regex: req.query.q, $options: "i" } },
            ]
        });
        if (!tweets) {
            throw new ApiError(404, "No tweets found");
        }
        return res.status(200).json(new ApiResponse(200, tweets, "Tweets according to query found successfully"));
    }),

    getTweets: asyncHandler(async (req, res) => {
        const tweets = await Tweet.find();
        if (!tweets) {
            throw new ApiError(404, "No tweets found");
        }
        const response = res.status(200).json(new ApiResponse(200, tweets, "Tweets found successfully"));
        console.log('Tweet found successfully');
        return response;
    }),

    createTweet: asyncHandler(async (req, res) => {
        const { text } = req.body;
        if (text === "") {
            throw new ApiError(400, 'Text is required');
        }

        const tweet = await Tweet.create({
            user: req.user._id,
            text,
        });

        const createdTweet = await tweet.findOne({ _id: tweet._id });
        if (!createdTweet) {
            throw new ApiError(500, 'Something went wrong while creating this tweet');
        }
        const PostViewsTab = await PostViews.create({ tweetId: createdTweet._id });
        if (!PostViewsTab) throw new ApiError(500, 'Something went wrong while creating this tweet\'s views table');

        const PostLikesTab = await PostLikes.create({ tweetId: createdTweet._id });
        if (!PostLikesTab) throw new ApiError(500, 'Something went wrong while creating this tweet\'s likes table');

        const PostCommentsTab = await PostComments.create({ tweetId: createdTweet._id });
        if (!PostCommentsTab) throw new ApiError(500, 'Something went wrong while creating this tweet\'s comments table');

        const response = res.status(201).json(new ApiResponse(201, createdTweet, 'Tweet created successfully'));
        console.log('Tweet created successfully');
        return response;
    }),

    updateTweet: asyncHandler(async (req, res) => {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) {
            throw new ApiError(404, 'Tweet not found');
        }

        if (!tweet.isTweetOwner(req.user._id)) {
            throw new ApiError(403, 'You are not authorized to update this tweet');
        }

        tweet.text = req.body.text;
        tweet.country = req.body.country;
        tweet.language = req.body.language;

        await tweet.save();

        const response = res.status(200).json(new ApiResponse(200, tweet, 'Tweet updated successfully'));
        console.log('Tweet updated successfully');
        return response;
    }),

    deleteTweet: asyncHandler(async (req, res) => {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) {
            throw new ApiError(404, 'Tweet not found');
        }

        if (!tweet.isTweetOwner(req.user._id)) {
            throw new ApiError(403, 'You are not authorized to delete this tweet');
        }

        await tweet.remove();

        const response = res.status(200).json(new ApiResponse(200, tweet, 'Tweet deleted successfully'));
        console.log('Tweet deleted successfully');
        return response;
    }),

    createTweetReplyToTweetId: asyncHandler(async (req, res) => {
        const { text } = req.body;
        if (text === "") {
            throw new ApiError(400, 'Text is required');
        }

        const tweet = await Tweet.create({
            user: req.user._id,
            text,
            inReplyToTweetId: req.params.id,
        });

        const createdTweet = await tweet.findOne({ _id: tweet._id });
        if (!createdTweet) {
            throw new ApiError(500, 'Something went wrong while creating this tweet');
        }

        const PostViewsTab = await PostViews.create({ tweetId: createdTweet._id });
        if (!PostViewsTab) throw new ApiError(500, 'Something went wrong while creating this tweet\'s views table');

        const PostLikesTab = await PostLikes.create({ tweetId: createdTweet._id });
        if (!PostLikesTab) throw new ApiError(500, 'Something went wrong while creating this tweet\'s likes table');

        const response = res.status(201).json(new ApiResponse(201, createdTweet, 'Tweet created successfully'));
        console.log('Reply Tweet to another Tweet created successfully');
        return response;
    }),

    createTweetReplyToUserId: asyncHandler(async (req, res) => {
        const { text } = req.body;
        if (text === "") {
            throw new ApiError(400, 'Text is required');
        }

        const tweet = await Tweet.create({
            user: req.user._id,
            text,
            inReplyToUserId: req.params.id,
        });

        const createdTweet = await tweet.findOne({ _id: tweet._id });
        if (!createdTweet) {
            throw new ApiError(500, 'Something went wrong while creating this tweet');
        }

        const PostViewsTab = await PostViews.create({ tweetId: createdTweet._id });
        if (!PostViewsTab) throw new ApiError(500, 'Something went wrong while creating this tweet\'s views table');

        const PostLikesTab = await PostLikes.create({ tweetId: createdTweet._id });
        if (!PostLikesTab) throw new ApiError(500, 'Something went wrong while creating this tweet\'s likes table');

        const response = res.status(201).json(new ApiResponse(201, createdTweet, 'Tweet created successfully'));
        console.log('Reply Tweet to User created successfully');
        return response;
    }),

    retweet: asyncHandler(async (req, res) => {
        const tweet = await Tweet.findById(req.params.tweetId);

        if (!tweet) {
            throw new ApiError(404, 'Tweet not found');
        }

        const retweet = await Tweet.create({
            user: req.user._id,
            text: tweet.text,
            inReplyToTweetId: tweet._id,
        });

        const createdRetweet = await Tweet.findOne({ _id: retweet._id });
        if (!createdRetweet) {
            throw new ApiError(500, 'Something went wrong while creating this retweet');
        }

        const PostViewsTab = await PostViews.create({ tweetId: createdTweet._id });
        if (!PostViewsTab) throw new ApiError(500, 'Something went wrong while creating this tweet\'s views table');

        const response = res.status(201).json(new ApiResponse(201, createdRetweet, 'Retweet created successfully'));
        console.log('Retweet created successfully');
        return response;
    }),

    unRetweet: asyncHandler(async (req, res) => {
        const retweet = await Tweet.findOne({
            user: req.user._id,
            inReplyToTweetId: req.params.tweetId,
        });

        if (!retweet) {
            throw new ApiError(404, 'Retweet not found');
        }

        await Tweet.findOneAndDelete({ inReplyToTweetId: req.params.tweetId });

        const response = res.status(200).json(new ApiResponse(200, retweet, 'Retweet deleted successfully'));
        console.log('Retweet deleted successfully');
        return response;
    }),

    like: asyncHandler(async (req, res) => {
        const tweet = await Tweet.findById(req.params.tweetId);

        if (!tweet) {
            throw new ApiError(404, 'Tweet not found');
        }

        tweet.likeCount += 1;
        await tweet.save();

        const response = res.status(200).json(new ApiResponse(200, tweet, 'Tweet liked successfully'));
        console.log('Tweet liked successfully');
        return response;
    }),

    unlike: asyncHandler(async (req, res) => {
        const tweet = await Tweet.findById(req.params.tweetId);

        if (!tweet) {
            throw new ApiError(404, 'Tweet not found');
        }

        tweet.likeCount -= 1;
        await tweet.save();

        const response = res.status(200).json(new ApiResponse(200, tweet, 'Tweet unliked successfully'));
        console.log('Tweet unliked successfully');
        return response;
    }),

    getRetweets: asyncHandler(async (req, res) => {
        const retweets = await Tweet.find({ inReplyToTweetId: req.params.tweetId });
        if (!retweets) {
            throw new ApiError(404, 'No retweets found');
        }

        const response = res.status(200).json(new ApiResponse(200, retweets, 'Retweets found successfully'));
        console.log('Retweets found successfully');
        return response;
    }),

};

export default tweetController;