import logger from "../middlewares/logger/logger.js";
import { fetchAllCategory, fetchCategoryById, createCategory, editCategory, removeCategory, getCategoryByProductId } from '../services/categoryService.js';


export const getAllCategory = async (req, res) => {
    try {
        const category = await fetchAllCategory();
        logger.info(`Fetched ${category.length} category`);
        res.json(category);
    } catch (error) {
        logger.error(`Fetch error: ${err.message}`);
        res.status(500).json({
            error: "Error fetching categories",
            details: err.message,
        });
    }
}


export const getCategoryById = async (req, res) => {
    const cid = req.params.id;
    try {
        const category = await fetchCategoryById(cid);
        if (!category) {
            logger.warn(`Cateory ID ${cid} not found`);
            return res.status(404).json({ error: "Category not found" });
        }
        logger.info(`Category Fetched by id:${cid}`)
        res.json(category);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching Category by id",
        })
    }
}

export const addCategory = async (req, res) => {
    const category = req.body;
    try {
        await createCategory(category, req.user);
        logger.info(`New category added: ${JSON.stringify(category)}`);
        res.status(201).json({ message: "Category Added successfull" })
    } catch (error) {
        logger.error(`Error adding category:${error}`);
        res.status(500).json({
            error: "Error adding category"
        })
    }
}

export const updateCategory = async (req, res) => {
    const cid = req.params.id;
    const category = req.body;
    try {
        await editCategory(cid, category, req.user);
        logger.info(`Catogory updated - ID: ${cid}, Data: ${JSON.stringify(category)}`);
        res.status(200).json({ message: "category updated successfully" });
    } catch (err) {
        logger.error(`Error updating categoty with ID ${cid}: ${err.message}`);
        res.status(500).json({ error: "Error updating category" });
    }
}


export const deleteCategory = async (req, res) => {
    const cid = req.params.id;
    try {
        await removeCategory(cid);
        logger.info(`Category deleted with Id:${cid}`);
        res.status(200).json({
            message: "category deleted successfully"
        })
    } catch (error) {
        logger.error(`Error deleting category with ID ${cid}:${err.message}`);
        res.status(500).json({ error: "Error deleting category" })
    }
}

export const getCategoryByProduct = async (req, res) => {
    const pid = req.params.pid;
    try {
        const category = await getCategoryByProductId(pid);
        if (!category || category.length === 0) {
            logger.warn(`Category with this product id: ${pid} is not found`);
            return res.status(404).json({ error: "Category not found" });
        }
        logger.info(`Category Fetched by pid:${pid}`)
        res.json(category.Category);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching category ",
        })
    }
}