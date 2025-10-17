import express from 'express';
import {getPreSignedUrl,uploadAndCountController} from "../controller/uploadController.js"
import multer from 'multer'

const router=express.Router();
const upload=multer({storage:multer.memoryStorage()})

router.get('/upload',getPreSignedUrl);
router.post('/upload-count',upload.single("file"),uploadAndCountController);


export default router