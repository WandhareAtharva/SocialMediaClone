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

// Routes
import userRoutes from './routes/user.routes.js';
import userProfileRoutes from './routes/userProfile.routes.js';
import userNotifications from './routes/userNotifications.routes.js';
import userSettings from './routes/userSettings.routes.js';

// User routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/userProfile', userProfileRoutes);
app.use('/api/v1/userNotifications', userNotifications);
app.use('/api/v1/userSettings', userSettings);

export default app;