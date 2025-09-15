import mongoose from "mongoose";

export async function connectDB() {
    if (!process.env.MONGO_URI) {
        console.error('Error: MONGO_URI is not defined in the environment variables.');
        process.exit(1); 
    }
    await mongoose.connect(process.env.MONGO_URI);
}
export default connectDB;