console.log('Loaded: app.js File');
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());

// Import Routes
import userRoutes from './routes/user.routes.js';
import userProfileRoutes from './routes/userProfile.routes.js';
import userNotifications from './routes/userNotifications.routes.js';
import userSettings from './routes/userSettings.routes.js';
import tweetRoutes from './routes/tweet.router.js';
import postLikes from './routes/postLikes.routes.js';
import postViews from './routes/postViews.routes.js';
import postComments from './routes/postComments.routes.js';
import favorites from './routes/favorites.routes.js';
import FollowedRelationships from './routes/followedRelationships.routes.js';

// Use Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/userProfile', userProfileRoutes);
app.use('/api/v1/userNotifications', userNotifications);
app.use('/api/v1/userSettings', userSettings);
app.use('/api/v1/tweet', tweetRoutes);
app.use('/api/v1/postLikes', postLikes);
app.use('/api/v1/postViews', postViews);
app.use('/api/v1/postComments', postComments);
app.use('/api/v1/favorites', favorites);
app.use('/api/v1/followedRelationships', FollowedRelationships);

export default app;