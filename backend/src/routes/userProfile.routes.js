console.log('Loaded: userProfile.routes.js File');
import { Router } from 'express';
import userProfileController from '../controllers/userProfile.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

// Secure Routes
router.route('/create-user-profile').post(verifyJWT, userProfileController.createUserProfile);

export default router;