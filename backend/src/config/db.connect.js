import mongoose from 'mongoose';
import { DB_NAME } from './keys.js';

const connectDB = async () => {
    try {
        // console.log('Connecting to MongoDB Servers...\nMONGODB_URI:', process.env.MONGODB_URI);
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Successfully connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error while connecting to MongoDB Servers:\n\t ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;