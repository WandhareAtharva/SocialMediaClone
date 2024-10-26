import mongoose from 'mongoose';
import {DB_NAME} from './config/keys.js';

const connecDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB Successfully connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error while connecting to MongoDB Servers:\n\t ${error.message}`);
        process.exit(1);
    }
}

export default connecDB;