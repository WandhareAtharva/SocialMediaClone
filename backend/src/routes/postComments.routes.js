import { Router } from "express";
import postCommentsController from "../controllers/postComments.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/:tweetId')
    .post(verifyJWT, postCommentsController.createComment)
    .get(verifyJWT, postCommentsController.getComments)
    .delete(verifyJWT, postCommentsController.deleteComment)
    .put(verifyJWT, postCommentsController.updateComment)
    .patch(verifyJWT, postCommentsController.updateLikes);

export default router;