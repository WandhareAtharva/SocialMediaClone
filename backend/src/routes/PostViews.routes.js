import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import postViewController from '../controllers/postViews.controller.js';

const router = Router();

router.get('/:tweetId', verifyJWT, postViewController.getPostViews)
    .post('/:tweetId', verifyJWT, postViewController.createPostView)
    .delete('/:tweetId', verifyJWT, postViewController.deletePostView);

export default router;