console.log('Loaded: index.js File');
import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });

import app from './app.js';
import connectDB from './config/db.connect.js';

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(`MongoDB connection Error: ${err}`);
    });