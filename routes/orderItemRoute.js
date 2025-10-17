import express from 'express';
import { validate } from '../middlewares/validator/validate.js';
import {orderItemSchema} from '../middlewares/validator/orderItemSchema.js';
import {getAllOrderItem,getOrderItemById,addOrderItem,updateOrderItem,deleteOrderItem,getOrderItemsByProductId} from '../controllers/orderItemController.js'
import { verifyToken } from '../middlewares/authMiddleware/authMiddleware.js';
const router=express.Router();

router.get('/',verifyToken,getAllOrderItem);
router.get('/:id',verifyToken,getOrderItemById);
router.get('/products/:pid',verifyToken,getOrderItemsByProductId)
router.post('/',verifyToken,validate(orderItemSchema),addOrderItem);
router.put('/:id',verifyToken,validate(orderItemSchema),updateOrderItem);
router.delete('/:id',verifyToken,deleteOrderItem);

export default router;