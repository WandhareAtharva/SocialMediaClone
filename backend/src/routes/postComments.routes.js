import { Router } from "express";
import postCommentsController from "../controllers/postComments.controller.js";

const router = Router();

router.route('/:tweetId')
    .post(postCommentsController.createComment)
    .get(postCommentsController.getComments)
    .delete(postCommentsController.deleteComment)
    .put(postCommentsController.updateComment)
    .patch(postCommentsController.updateLikes);

export default router;