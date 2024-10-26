import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);

// Secure Routes
router.route('/logout').post(verifyJWT, userController.logout);

export default router;