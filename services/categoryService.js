import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

export const fetchAllCategory = async (req, res) => {
    return await Category.findAll({ where: { is_deleted: false } });
}

export const fetchCategoryById = async (id) => {
    return await Category.findOne({
        where: { cid: id, is_deleted: false }
    })
}

export const createCategory = async (category, currentUser) => {
    return await Category.create(category, { currentUser });
}

export const editCategory = async (id, category, currentUser) => {
    return await Category.update(category, { where: { cid: id }, individualHooks: true, currentUser });
}

export const removeCategory = async (id) => {
    return await Category.update({ is_deleted: true }, { where: { cid: id } });
}

export const getCategoryByProductId = async (pid) => {
    return await Product.findOne(
        {
            where: { pid, is_deleted: false },
            include: [{
                model: Category,
                attributes: ["cid", "name", "description"]
            }]
        })
}
