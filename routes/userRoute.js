import express from 'express';
import { uploadAndImportUserFile, getAllUser } from '../controller/userController.js';
import { upload } from '../middleware/uploadMiddleware.js';
const router = express.Router();

router.post('/user/import', upload.single("file"), uploadAndImportUserFile);
router.get('/user', getAllUser);

export default router