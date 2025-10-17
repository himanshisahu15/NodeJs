import express from 'express';
import userRoute from '../routes/userRoute.js';
import categoryRoute from '../routes/categoryRoute.js';
import orderRoute from '../routes/orderRoute.js';
import productRoute from '../routes/productRoute.js';
import orderItemRoute from '../routes/orderItemRoute.js';

const router=express.Router();

router.use('/users', userRoute);
router.use('/categories', categoryRoute);
router.use('/products', productRoute);
router.use('/orders', orderRoute);
router.use('/order-items', orderItemRoute);

export default router;