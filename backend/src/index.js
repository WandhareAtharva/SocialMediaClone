import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.connect.js';

dotenv.config({ path: './src/.env' });

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