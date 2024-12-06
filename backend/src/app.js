import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import https from 'https';
import { Server } from 'socket.io';
import fs from 'fs';
import passport from 'passport';
import session from 'cookie-session';

const app = express();

const key = fs.readFileSync('../secureKeys/key.pem')
const cert = fs.readFileSync('../secureKeys/cert.pem')

const server = https.createServer({ key, cert }, app);

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true
    },
})

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(session({
    secret: process.env.Client_Secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    keys: [process.env.Client_Secret]
}));

app.use(passport.initialize());
app.use(passport.session());

// Import Routes
import userRoutes from './routes/user.routes.js';
import userProfileRoutes from './routes/userProfile.routes.js';
import userNotifications from './routes/userNotifications.routes.js';
import userSettings from './routes/userSettings.routes.js';
import tweetRoutes from './routes/tweet.router.js';
import postLikes from './routes/PostLikes.routes.js';
import postViews from './routes/PostViews.routes.js';
import postComments from './routes/postComments.routes.js';
import favorites from './routes/favorites.routes.js';
import FollowedRelationships from './routes/followedRelationships.routes.js';
import GoogleAuth from './routes/auth.routes.js';

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
app.use('/auth', GoogleAuth);

export { app, io, server };