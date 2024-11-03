import {Router} from 'express';
import followedRelationshipsController from '../controllers/followedRelationships.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/follow/:followedPersonUserId').post(verifyJWT, followedRelationshipsController.followUser);
router.route('/unfollow/:followedPersonUserId').post(verifyJWT, followedRelationshipsController.unfollowUser);

export default router;