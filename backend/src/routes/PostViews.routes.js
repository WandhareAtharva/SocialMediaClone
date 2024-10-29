console.log('Loaded: PostViews.routes.js File');
import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import postViewController from '../controllers/postViews.controller';

const router = Router();

router.get('/:tweetId', verifyJWT, postViewController.getPostViews)
    .post('/:tweetId', verifyJWT, postViewController.createPostView)
    .delete('/:tweetId', verifyJWT, postViewController.deletePostView);

export default router;