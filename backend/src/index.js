import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
// dotenv.configDotenv({ path: '../../.env' })

import { app, io, server } from './app.js';
import connectDB from './config/db.connect.js';

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {

        app.get('/', (req, res) => {
            res.status(200).send('Server is running');
        })

        io.on('connection', (socket) => {
            console.log('Socket connected: ', socket.id);

            socket.on('disconnect', () => {
                console.log('Socket disconnected: ', socket.id);
            })
        })

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(`MongoDB connection Error: ${err}`);
    });