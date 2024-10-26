import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);

// Secure Routes
router.route('/get-users').get(verifyJWT, userController.getAllUsers);
router.route('/logout').post(verifyJWT, userController.logout);
router.route('/get-user').get(verifyJWT, userController.getProfile);
router.route('/update-user-profile').put(verifyJWT, userController.updateProfile);
router.route('/delete-user').delete(verifyJWT, userController.deleteUser);
router.route('/get-user-by-id/:id').get(verifyJWT, userController.getUserById);
router.route('/change-password').put(verifyJWT, userController.changePassword);
router.route('/change-profile-picture').put(verifyJWT, upload.fields([
    {
        name: "profilePicture",
        maxCount: 1
    }
]), userController.changeProfilePicture);
router.route('/refresh-token').post(userController.refreshAuthToken);

export default router;