import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.login);

export default router;