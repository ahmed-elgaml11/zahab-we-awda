// import express from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';
// import { errorHandler, notFound } from './middlewares/errorHandler.js';
// import logger from './utils/logger.js';
// import apiRoutes from './routes/index.js';


// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     credentials: true
// }));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cookieParser());
// app.use((req, res, next) => {
//     logger.info(`${req.method} ${req.path}`, {
//         ip: req.ip,
//         userAgent: req.get('User-Agent')
//     });
//     next();
// });

// // Initialize environment variables
// dotenv.config();

// // ES modules fix for __dirname

// const app = express();
// const PORT = process.env.PORT || 3000;





// app.use(express.static(path.join(__dirname, 'public')));





// // API Routes
// app.use('/api', apiRoutes);

// // Error handlers (MUST be last)
// app.use(notFound);
// app.use(errorHandler);

// // Start server
// app.listen(PORT, async() => {
//     console.log('✅ Database connected successfully');
//     console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode Main Site: http://localhost:${PORT}`);
// });






























process.on('uncaughtException', (err) => {      // synchrounous code which not handled
    console.log('uncaught Exception')
    console.log(err.name, err.message)
    process.exit(1); 
})

import app from './app'
import connectDB from './config/db.js';

const port = process.env.PORT || 8080
connectDB()
.then(() => {
    console.log('connected to db');
    app.listen(port, () => {
        console.log(`Listening on ${port}`)
    })
})
.catch(err => {
    console.log(err);
})


process.on('unhandledRejection', (err) => {      // asynchrounous code which not handled
    console.log('unhandled Rejection')
    console.log(err)
    process.exit(1); 
})