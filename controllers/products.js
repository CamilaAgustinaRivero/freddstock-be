const { response } = require('express');
const Product = require('../models/Product');

const getProducts = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Get products list'
    })
}

const createProduct = async (req, res = response) => {
    const product = new Product(req.body);
    try {
        const productSaved = await product.save();
        res.json({
            ok: true,
            product: productSaved
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}

const updateProduct = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Update a product'
    });
}

const deleteProduct = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete a product'
    })
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}