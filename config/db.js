import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();



export async function connectDB() {
    if (!DATABASE) {
        console.error('Error: MONGO_URI is not defined in the environment variables.');
        process.exit(1); 
    }
    await mongoose.connect(process.env.MONGO_URI);
}
export default connectDB;