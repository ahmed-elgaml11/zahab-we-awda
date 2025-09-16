import connectDB from "../config/db.js";
import User from "../models/User.js";
connectDB()
const createAdminUser = async() => {
    await User.create({
        name: 'admin',
        email: 'admin@example.com',
        password: '123456',
        role: 'admin'
    })
}

createAdminUser()