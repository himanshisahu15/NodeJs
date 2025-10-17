import logger from "../middlewares/logger/logger.js";
import { fetchAllOrderItem, fetchOrderItemById, createOrderItem, editOrderItem, removeOrderItem, fetchOrderItemByProductId } from '../services/orderItemService.js';


export const getAllOrderItem = async (req, res) => {
    try {
        const orderItem = await fetchAllOrderItem();
        logger.info(`Fetched ${orderItem.length} orderItem`);
        res.json(orderItem);
    } catch (error) {
        logger.error(`Fetch error: ${err.message}`);
        res.status(500).json({
            error: "Error fetching orderItem",
            details: err.message,
        });
    }
}


export const getOrderItemById = async (req, res) => {
    try {
        const orderItemid = req.params.id;
        const orderItem = await fetchOrderItemById(orderItemid);
        if (!orderItem) {
            logger.warn(`orderItem ID ${orderItemid} not found`);
            return res.status(404).json({ error: "orderItem not found" });
        }
        logger.info(`orderItem Fetched by id:${orderItemid}`)
        res.json(orderItem);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching orderItem by id",
        })
    }
}

export const addOrderItem = async (req, res) => {
    const orderItem = req.body;
    try {
        await createOrderItem(orderItem,req.user);
        logger.info(`New orderItem added: ${JSON.stringify(orderItem)}`);
        res.status(201).json({ message: "OrderItem Added successfull" })
    } catch (error) {
        logger.error(`Error adding orderItem:${error}`);
        res.status(500).json({
            error: "Error adding orderItem"
        })
    }
}

export const updateOrderItem = async (req, res) => {
    const orderItemid = req.params.id;
    const orderItem = req.body;
    try {
        await editOrderItem(orderItemid, orderItem,req.user);
        logger.info(`orderItem updated - ID: ${orderItemid}, Data: ${JSON.stringify(orderItem)}`);
        res.status(200).json({ message: "orderItem updated successfully" });
    } catch (err) {
        logger.error(`Error updating orderItem with ID ${orderItemid}: ${err.message}`);
        res.status(500).json({ error: "Error updating orderItem" });
    }
}


export const deleteOrderItem = async (req, res) => {
    const orderItemid = req.params.id;
    try {
        await removeOrderItem(orderItemid);
        logger.info(`orderItem deleted with Id:${orderItemid}`);
        res.status(200).json({
            message: "orderItem deleted successfully"
        })
    } catch (error) {
        logger.error(`Error deleting orderItem with ID ${orderItemid}:${err.message}`);
        res.status(500).json({ error: "Error deleting orderItem" })
    }
}

export const getOrderItemsByProductId = async (req, res) => {
    try {
        const pid = req.params.pid;

        const orderItem = await fetchOrderItemByProductId(pid);
        if (!orderItem || orderItem.length === 0) {
            logger.warn(`orderItem with product ID ${pid} not found`);
            return res.status(404).json({ error: "OrderItem with product id not found" });
        }
        logger.info(`orderItem Fetched by product id:${pid}`)
        res.json(orderItem);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching orderItem by product id",
        })
    }
}