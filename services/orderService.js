import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const fetchAllOrder = async (req, res) => {
    return await Order.findAll({ where: { is_deleted: false } });
}

export const fetchOrderById = async (id) => {
    const order = await Order.findOne({
        where: { orderId: id, is_deleted: false }
    })
    if (!order) {
        return null;
    }

    const user = await User.findByPk(order.userId);
    if (!user) {
        throw new Error("user not found");
    }
    return { order };
}

export const createOrder = async (order,currentUser) => {
    const user = await User.findByPk(order.userId);
    if (!user) {
        throw new Error("User not found")
    }
    return await Order.create(order,{currentUser});
}

export const editOrder = async (id, order,currentUser) => {
    return await Order.update(order, { where: { orderId: id },individualHooks:true,currentUser });
}

export const removeOrder = async (id) => {
    return await Order.update({ is_deleted: true }, { where: { orderId: id } });
}


export const fetchOrderByUser = async (userId) => {
    return await Order.findAll({
        where: { userId, is_deleted: false },
        include: [
            {
                model: User,
                attributes: ["userId", "name", "email", "role"]
            }]
    })
}