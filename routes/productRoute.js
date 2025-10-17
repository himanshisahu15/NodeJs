import express from 'express';
import {getAllProduct,getProductById,addProduct,updateProduct,deleteProduct,searchProductByName,sortProductByPrice,getProductByCategory } from '../controllers/productController.js';
import {productSchema} from '../middlewares/validator/productSchema.js';
import { validate } from '../middlewares/validator/validate.js';
import { verifyToken,isAdmin } from '../middlewares/authMiddleware/authMiddleware.js';

const router=express.Router();

router.get('/',verifyToken,getAllProduct);
router.get('/search',verifyToken,searchProductByName);
router.get('/sort',verifyToken,sortProductByPrice);
router.get('/:id',verifyToken,getProductById);
router.get('/categories/:cid',verifyToken,getProductByCategory);
router.post('/',verifyToken,validate(productSchema),addProduct);
router.put('/:id',verifyToken,validate(productSchema),updateProduct);
router.delete('/:id',verifyToken,deleteProduct);

export default router