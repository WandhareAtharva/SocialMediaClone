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
// import postRoutes from './routes/post.routes.js';
// import commentRoutes from './routes/comment.routes.js';
// import likeRoutes from './routes/like.routes.js';
// import followRoutes from './routes/follow.routes.js';
// import notificationRoutes from './routes/notification.routes.js';
// import messageRoutes from './routes/message.routes.js';
// import conversationRoutes from './routes/conversation.routes.js';

// User routes
app.use('/api/v1/users', userRoutes);

export default app;