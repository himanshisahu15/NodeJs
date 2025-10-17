import express from'express'
import dotenv from 'dotenv';
import  connectDb from '../config/dbConfig.js';
import Route from '../route/mainRoute.js';
dotenv.config()
const app=express();

app.use(express.json());

app.use('/',Route);

connectDb();

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
   
    console.log(`server started at http://localhost:${PORT}`)
})

