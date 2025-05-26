import express from 'express';
import { connection } from './DB/Connection.js';
import associations from './DB/models/associations.js';
import router from './route/users_route.js';
import auth from './middleware/token_verification.js';
import cookieParser from 'cookie-parser';
import Urlrouter from './route/urls_route.js'
import { errorHandler } from './errors_handling/errors.js';

const app=express()
const PORT=4000
connection()
associations()
app.use(express.json())
app.use(cookieParser());
app.use('/users',auth)
app.use(Urlrouter)
app.use(router)
app.use(errorHandler)
app.listen(PORT,()=>{
        
        console.log(`Listening on port ${PORT}`)
})

