import { Router } from 'express';
import userProfileController from '../controllers/userProfile.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/user-profile/:id').get(userProfileController.getUserProfile);

// Secure Routes
router.route('/')
    .get(verifyJWT, userProfileController.getUserProfile)
    .put(verifyJWT, userProfileController.updateUserProfile);

router.route('/:id').get(verifyJWT, userProfileController.getUserProfileById);

export default router;