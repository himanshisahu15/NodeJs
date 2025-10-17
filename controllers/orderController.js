import logger from "../middlewares/logger/logger.js";
import User from "../models/userModel.js";
import { fetchAllOrder, fetchOrderById, createOrder, editOrder, removeOrder, fetchOrderByUser } from '../services/orderService.js';


export const getAllOrder = async (req, res) => {
    try {
        const order = await fetchAllOrder();
        logger.info(`Fetched ${order.length} order`);
        res.json(order);
    } catch (error) {
        logger.error(`Fetch error: ${err.message}`);
        res.status(500).json({
            error: "Error fetching order",
            details: err.message,
        });
    }
}


export const getOrderById = async (req, res) => {
    try {
        const orderid = req.params.id;
        const order = await fetchOrderById(orderid);
        if (!order) {
            logger.warn(`order ID ${orderid} not found`);
            return res.status(404).json({ error: "order not found" });
        }
        //     const user = await User.findByPk(order.userId);
        // if (!user) {
        //   return res.status(404).json({ message: "User not found" });
        // }
        logger.info(`order Fetched by id:${orderid}`)
        res.json(order);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching order by id",
        })
    }
}

export const addOrder = async (req, res) => {
    const order = req.body;
    try {
        await createOrder(order,req.user);
        logger.info(`New order added: ${JSON.stringify(order)}`);
        res.status(201).json({ message: "Order Added successfull" })
    } catch (error) {
        logger.error(`Error adding order:${error}`);
        res.status(500).json({
            error: "Error adding order"
        })
    }
}

export const updateOrder = async (req, res) => {
    const orderid = req.params.id;
    const order = req.body;
    try {
        await editOrder(orderid, order,req.user);
        logger.info(`order updated - ID: ${orderid}, Data: ${JSON.stringify(order)}`);
        res.status(200).json({ message: "order updated successfully" });
    } catch (err) {
        logger.error(`Error updating order with ID ${orderid}: ${err.message}`);
        res.status(500).json({ error: "Error updating order" });
    }
}


export const deleteOrder = async (req, res) => {
    const orderid = req.params.id;
    try {
        await removeOrder(orderid);
        logger.info(`order deleted with Id:${orderid}`);
        res.status(200).json({
            message: "order deleted successfully"
        })
    } catch (error) {
        logger.error(`Error deleting order with ID ${orderid}:${err.message}`);
        res.status(500).json({ error: "Error deleting order" })
    }
}

export const getOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const order = await fetchOrderByUser(userId);
        if (!order || order.length === 0) {
            logger.warn(`user ID ${userId} not found`);
            return res.status(404).json({ error: "order not found" });
        }

        logger.info(`ordre Fetched by user id:${userId}`)
        res.json(order);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching user by id",
        })
    }
}