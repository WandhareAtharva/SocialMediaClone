console.log('Loaded: userProfile.routes.js File');
import { Router } from 'express';
import userProfileController from '../controllers/userProfile.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/user-profile/:id').get(userProfileController.getUserProfile);

// Secure Routes
router.route('/get-user-profile').get(verifyJWT, userProfileController.getUserProfile);
router.route('/update-user-profile').put(verifyJWT, userProfileController.updateUserProfile);

export default router;