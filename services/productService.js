import { Op, fn, col, where } from "sequelize";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

export const fetchAllProduct = async (req, res) => {
  return await Product.findAll({ where: { is_deleted: false } });
}

export const fetchProductById = async (id) => {

  return await Product.findOne({ where: { pid: id, is_deleted: false } })
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
}

export const createProduct = async (product, currentUser) => {
  return await Product.create(product, {currentUser});
}

export const editProduct = async (id, product, currentUser) => {
  return await Product.update(product, { where: { pid: id }, individualHooks: true, currentUser });
}

export const removeProduct = async (id) => {
  return await Product.update({ is_deleted: true }, { where: { pid: id } });
}

export const fetchProductByName = async (name) => {
  return await Product.findAll({
    where: {
      is_deleted: false,
      [Op.and]: [
        where(fn("LOWER", col("name")), {
          [Op.like]: `%${name.toLowerCase()}%`
        })
      ]
    }
  });
}

export const getProductByCategoryId = async (cid) => {
  return await Product.findAll(
    {
      where: { categoryId: cid, is_deleted: false },
      include: [{
        model: Category,
        attributes: ["name", "description"]
      }]
    })
}


export const sortProduct = async (order) => {
  return await Product.findAll({
    where: {
      is_deleted: false
    },
    order: [["price", order && order.toLowerCase() === "desc" ? "DESC" : "ASC"]]

  })
}
