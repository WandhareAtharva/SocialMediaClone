console.log('Loaded: PostLikes.routes.js File');
import { verifyJWT } from "../middleware/auth.middleware";
import { Router } from "express";
import postLikesController from "../controllers/PostLikes.controller";

const router = Router();

router.route('/')
    .post(verifyJWT, postLikesController.createPostLike)
    .get(verifyJWT, postLikesController.getPostLikes);
router.route('/:id')
    .get(verifyJWT, postLikesController.getPostLike)
    .delete(verifyJWT, postLikesController.deletePostLike);

export default router;