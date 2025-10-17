import express from 'express'
import dotenv from 'dotenv'
import uploadRoute from '../routes/uploadRoute.js'
dotenv.config();

const app=express();

app.use(express.json());

app.use('/api',uploadRoute);

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
})

export default app;