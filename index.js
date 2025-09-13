
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