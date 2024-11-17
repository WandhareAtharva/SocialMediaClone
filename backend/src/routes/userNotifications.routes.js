import { Router } from 'express';
import userNotificationsController from '../controllers/userNotifications.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/')
    .get(verifyJWT, userNotificationsController.getNotifications)
    .patch(verifyJWT, userNotificationsController.updateNotificationsSettings)
    .post(verifyJWT, userNotificationsController.createNotification)

export default router;