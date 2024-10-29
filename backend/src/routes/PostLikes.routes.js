console.log('Loaded: PostLikes.routes.js File');
import { verifyJWT } from "../middleware/auth.middleware";
import { Router } from "express";
import postLikesController from "../controllers/postLikes.controller.js";

const router = Router();

router.route('/:tweetId')
    .get(verifyJWT, postLikesController.getPostLike)
    .post(verifyJWT, postLikesController.createPostLike)
    .delete(verifyJWT, postLikesController.deletePostLike);

export default router;