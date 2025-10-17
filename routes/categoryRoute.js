import express from 'express';
import {getAllCategory,getCategoryById,addCategory,updateCategory,deleteCategory,getCategoryByProduct } from '../controllers/categoryController.js';
import {categorySchema} from '../middlewares/validator/categorySchema.js';
import { validate } from '../middlewares/validator/validate.js';
import { verifyToken } from '../middlewares/authMiddleware/authMiddleware.js';


const router=express.Router();

router.get('/',verifyToken,getAllCategory);
router.get('/products/:pid',verifyToken,getCategoryByProduct)
router.get('/:id',verifyToken,getCategoryById);
router.post('/',verifyToken,validate(categorySchema),addCategory);
router.put('/:id',verifyToken,validate(categorySchema),updateCategory);
router.delete('/:id',deleteCategory);

export default router