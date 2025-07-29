import express from 'express';
import {run } from '../controllers/weatherController.js'

const router=express.Router();

router.get('/weather',run);



export default router;