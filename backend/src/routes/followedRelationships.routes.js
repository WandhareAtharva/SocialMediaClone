import { Router } from 'express';
import followedRelationshipsController from '../controllers/followedRelationships.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/follow/:followedPersonUserId').post(verifyJWT, followedRelationshipsController.followUser);
router.route('/unfollow/:followedPersonUserId').post(verifyJWT, followedRelationshipsController.unfollowUser);

router.route('/following').get(verifyJWT, followedRelationshipsController.getFollowing);
router.route('/followers').get(verifyJWT, followedRelationshipsController.getFollowers);

router.route('/following/:userId').get(followedRelationshipsController.getFollowingByUserId);
router.route('/followers/:userId').get(followedRelationshipsController.getFollowersByUserId);

router.route('/isFollowing/:followedPersonUserId').get(verifyJWT, followedRelationshipsController.isFollowing);
router.route('/isFollowedBy/:followerUserId').get(verifyJWT, followedRelationshipsController.isFollowedBy);

router.route('/followSuggestions').get(verifyJWT, followedRelationshipsController.getFollowSuggestions);
router.route('/followSuggestions/:userId').get(followedRelationshipsController.getFollowSuggestionsByUserId);

router.route('/followRequests').get(verifyJWT, followedRelationshipsController.getFollowRequests);
router.route('/followRequests/:userId').get(followedRelationshipsController.getFollowRequestsByUserId);

router.route('/acceptFollowRequest/:followerUserId').post(verifyJWT, followedRelationshipsController.acceptFollowRequest);
router.route('/rejectFollowRequest/:followerUserId').post(verifyJWT, followedRelationshipsController.rejectFollowRequest);

export default router;