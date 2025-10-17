// import Order from "../models/orderModel.js";
// import User from "../models/userModel.js";

import sequelize from "../config/dbConnection.js";
import OrderItem from "../models/orderItemModel.js";
import Product from "../models/productModel.js";

export const fetchAllOrderItem = async (req, res) => {
    return await OrderItem.findAll({ where: { is_deleted: false } });
}

export const fetchOrderItemById = async (id) => {
    // const order = await Order.findOne({
    //     where: { orderId: id, is_deleted: false }
    // })
    // if (!order) {
    //     return null;
    // }

    // const user = await User.findByPk(order.userId);
    // if (!user) {
    //     throw new Error("user not found");
    // }
    // return { order, user };
    return await OrderItem.findOne({ where: { is_deleted: false, orderItemId: id } })
}

export const createOrderItem = async (orderItem,currentUser) => {
    return await OrderItem.create(orderItem,{currentUser});
}

export const editOrderItem = async (id, orderItem,currentUser) => {
    return await OrderItem.update(orderItem, { where: { orderItemId: id } ,individualHooks:true,currentUser});
}

export const removeOrderItem = async (id) => {
    return await OrderItem.update({ is_deleted: true }, { where: { orderItemId: id } });
}


// export const fetchOrderItemByProductId=async(pid)=>{
//     return await OrderItem.findAll({
//         where:{
//             is_deleted:false,
//             productId:pid
//         },
//         include:[
//             {
//                 model:Product,
//                 attributes:["pid","name","description"]
//             }
//         ]
//     })
// }

export const fetchOrderItemByProductId = async (pid) => {
    return await sequelize.query("call getOrderItemByProductId(:pid)",
        {
            replacements: { pid }
        }
    )
}