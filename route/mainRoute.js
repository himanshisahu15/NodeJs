import express from "express";
import studentRoute from '../routes/studentRoute.js'

const router=express.Router();

router.use('/student',studentRoute);

export default router;