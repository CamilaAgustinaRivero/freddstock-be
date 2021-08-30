const { response } = require('express');
const Product = require('../models/Product');

const getProducts = async (req, res = response) => {
    let perPage = 5;
    let page = req.params.page || 1;
    const products = await Product.find().populate('category_id').skip((perPage * page) - perPage).limit(perPage);
    res.status(200).json({
        products,
        current: page,
        pages: Math.ceil(products.length / perPage)
    });
}

const createProduct = async (req, res = response) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).json({
            product
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const updateProduct = async (req, res = response) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                msg: 'Product does not exist.'
            });
        }

        if (req.body.stock < 0) {
            return res.status(500).json({
                msg: 'Stock can not be negative.'
            });
        }
        const newProduct = {
            ...req.body
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, newProduct);
        res.status(200).json({
            original: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const deleteProduct = async (req, res = response) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                msg: 'Product does not exist.'
            });
        }

        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            msg: 'Deleted product.'
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};