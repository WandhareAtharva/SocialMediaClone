console.log('Loaded: userNotifications.routes.js File');
import { Router } from 'express';
import userNotificationsController from '../controllers/userNotifications.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/notifications')
    .get(verifyJWT, userNotificationsController.getNotifications)
    .put(verifyJWT, userNotificationsController.updateNotificationsSettings);

export default router;