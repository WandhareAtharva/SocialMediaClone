import { Router } from 'express';
import passport from 'passport';

const router = Router();

// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/' }),
        (_, res) => {
            res.redirect('http://localhost:5173/dashboard');
        });

export default router;