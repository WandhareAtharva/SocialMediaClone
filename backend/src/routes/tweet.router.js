import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import tweetController from "../controllers/tweet.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route('/')
    .get(verifyJWT, tweetController.getTweets)
    .post(verifyJWT, upload.single('image'), tweetController.createTweet);

router.route('/search')
    .get(tweetController.getTweetsByQuery);

router.route('/:id')
    .get(verifyJWT, tweetController.getTweetsById)
    .put(verifyJWT, tweetController.updateTweet)
    .delete(verifyJWT, tweetController.deleteTweet);

router.route('/reply/:tweetId')
    .post(verifyJWT, tweetController.createTweetReplyToTweetId);

router.route('/reply/:tweetId/:userId')
    .post(verifyJWT, tweetController.createTweetReplyToUserId);

router.route('/retweet/:tweetId')
    .post(verifyJWT, tweetController.retweet)
    .delete(verifyJWT, tweetController.unRetweet);

router.route('/like/:tweetId')
    .post(verifyJWT, tweetController.like)
    .delete(verifyJWT, tweetController.unlike);

router.route('/retweets/:tweetId')
    .get(verifyJWT, tweetController.getRetweets);

export default router;