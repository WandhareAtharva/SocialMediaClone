import {Router} from 'express';
import followedRelationshipsController from '../controllers/followedRelationships.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/follow').post(verifyJWT, followedRelationshipsController.follow);
router.route('/unfollow').post(verifyJWT, followedRelationshipsController.unfollow);
router.route('/followers/:userId').get(verifyJWT, followedRelationshipsController.getFollowers);
router.route('/following/:userId').get(verifyJWT, followedRelationshipsController.getFollowing);
router.route('/isFollowing/:userId').get(verifyJWT, followedRelationshipsController.isFollowing);
router.route('/isFollowed/:userId').get(verifyJWT, followedRelationshipsController.isFollowed);
router.route('/followedUsers').get(verifyJWT, followedRelationshipsController.getFollowedUsers);
router.route('/addFollower').post(verifyJWT, followedRelationshipsController.addFollower);

export default router;