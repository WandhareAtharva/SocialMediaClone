console.log('Loaded: userSettings.routes.js File');
import { Router } from "express";
import userSettingsController from "../controllers/userSettings.controller.js";
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/')
    .get(verifyJWT, userSettingsController.getUserSettings)
    .patch(verifyJWT, userSettingsController.updateUserSettings);

export default router;