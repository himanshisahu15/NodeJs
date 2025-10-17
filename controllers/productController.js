import logger from "../middlewares/logger/logger.js";
import Product from "../models/productModel.js";
import { fetchAllProduct, fetchProductById, createProduct, editProduct, removeProduct, fetchProductByName, getProductByCategoryId, sortProduct } from '../services/productService.js';


export const getAllProduct = async (req, res) => {
    try {
        const product = await fetchAllProduct();
        logger.info(`Fetched ${product.length} product`);
        res.json(product);
    } catch (error) {
        logger.error(`Fetch error: ${err.message}`);
        res.status(500).json({
            error: "Error fetching product",
            details: err.message,
        });
    }
}


export const getProductById = async (req, res) => {
    try {
        const productid = req.params.id;
        const product = await fetchProductById(productid);
        if (!product) {
            logger.warn(`product ID ${productid} not found`);
            return res.status(404).json({ error: "product not found" });
        }
        logger.info(`Product Fetched by id:${productid}`)
        res.json(product);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching product by id",
        })
        // next(error);
    }
}

export const addProduct = async (req, res) => {
    const product = req.body;
    try {
        await createProduct(product, req.user);
        logger.info(`New product added: ${JSON.stringify(product)}`);
        res.status(201).json({ message: "Product Added successfull" })
    } catch (error) {
        logger.error(`Error adding product:${error}`);
        res.status(500).json({
            error: "Error adding product"
        })
    }
}

export const updateProduct = async (req, res) => {
    const productid = req.params.id;
    const product = req.body;
    try {
        await editProduct(productid, product, req.user);
        logger.info(`product updated - ID: ${productid}, Data: ${JSON.stringify(product)}`);
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        logger.error(`Error updating product with ID ${productid}: ${err.message}`);
        res.status(500).json({ error: "Error updating product" });
    }
}


export const deleteProduct = async (req, res) => {
    const productid = req.params.id;
    try {
        await removeProduct(productid);
        logger.info(`Product deleted with Id:${productid}`);
        res.status(200).json({
            message: "Product deleted successfully"
        })
    } catch (error) {
        logger.error(`Error deleting product with ID ${productid}:${err.message}`);
        res.status(500).json({ error: "Error deleting product" })
    }
}

export const searchProductByName = async (req, res) => {
    const { pname } = req.query;
    try {
        const product = await fetchProductByName(pname.trim().toLowerCase());
        if (!product || product.length === 0) {
            logger.warn(`product with name: ${pname} not found`);
            return res.status(404).json({ error: "product not found" });
        }
        logger.info(`Product Fetched by name:${pname}`)
        res.json(product);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching product by name",
        })
    }
}

export const getProductByCategory = async (req, res) => {
    const cid = req.params.cid;
    try {
        const product = await getProductByCategoryId(cid);
        if (!product || product.length === 0) {
            logger.warn(`product with this category id: ${cid} is not found`);
            return res.status(404).json({ error: "product not found" });
        }
        logger.info(`Product Fetched by cid:${cid}`)
        res.json(product);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching product ",
        })
    }
}

export const sortProductByPrice = async (req, res) => {
    const { order } = req.query;
    try {
        const product = await sortProduct(order);

        res.status(200).json({
            message: "Products sorted by price successfully",
            data: product,
        });

        logger.info(`Product sorted by price`)
        // res.json(product);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching product ",
        })
    }
}
