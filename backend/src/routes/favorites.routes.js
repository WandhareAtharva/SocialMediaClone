import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import favoritesController from '../controllers/favorites.controller.js';

const router = Router();

router.route('/:tweetId')
    .post(verifyJWT, favoritesController.add)
    .delete(verifyJWT, favoritesController.remove);

export default router;