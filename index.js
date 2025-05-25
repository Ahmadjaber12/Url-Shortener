import express from 'express';
import { connection } from './DB/Connection.js';
import associations from './DB/Models/Associations.js';
import router from './Routes/User.Routes.js';
import auth from './Middlewares/TokenVerification.js';
import cookieParser from 'cookie-parser';
import Urlrouter from './Routes/URL.Routes.js'

const app=express()
const PORT=4000
connection()
associations()
app.use(express.json())
app.use(cookieParser());
app.use('/users',auth)
app.use(Urlrouter)
app.use(router)
app.listen(PORT,()=>{
        
        console.log(`Listening on port ${PORT}`)
})

