import express from 'express';
import {getAllUser,getUserById,addUser,updateUser,deleteUser,searchUserByName,loginUser } from '../controllers/userController.js';
import {userSchema} from '../middlewares/validator/userSchema.js';
import { validate } from '../middlewares/validator/validate.js';
import { verifyToken,isAdmin } from '../middlewares/authMiddleware/authMiddleware.js';
import loginLimiter from '../middlewares/authMiddleware/loginLimiter.js';

const router=express.Router();

router.get('/',verifyToken,getAllUser);
router.get('/search',verifyToken,searchUserByName);
router.get('/:id',verifyToken,getUserById);
router.post('/',validate(userSchema),addUser);
router.put('/:id',verifyToken,validate(userSchema),updateUser);
router.delete('/:id',verifyToken,isAdmin,deleteUser);
router.post('/login',loginLimiter,loginUser);

export default router