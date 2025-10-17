import express from 'express';
import { validate } from '../middlewares/validator/validate.js';
import {orderSchema} from '../middlewares/validator/orderSchema.js';
import {getAllOrder,getOrderById,addOrder,updateOrder,deleteOrder,getOrderByUserId} from '../controllers/orderController.js'
import { verifyToken ,isAdmin} from '../middlewares/authMiddleware/authMiddleware.js';
const router=express.Router();

router.get('/',verifyToken,getAllOrder);
router.get('/:id',verifyToken,getOrderById);
router.get('/users/:userId',verifyToken,getOrderByUserId)
router.post('/',verifyToken,validate(orderSchema),addOrder);
router.put('/:id',verifyToken,validate(orderSchema),updateOrder);
router.delete('/:id',verifyToken,deleteOrder);

export default router;