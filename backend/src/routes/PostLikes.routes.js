import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import postLikesController from "../controllers/postLikes.controller.js";

const router = Router();

router.route('/:tweetId')
    .get(verifyJWT, postLikesController.getPostLike)
    .post(verifyJWT, postLikesController.createPostLike)
    .delete(verifyJWT, postLikesController.deletePostLike);

export default router;