const { response } = require('express');

const getProducts = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Get products list'
    })
}

const createProduct = (req, res = response) => {
    console.log(req.body);
    res.json({
        ok: true,
        msg: 'Create a product'
    })
}

const updateProduct = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Update a product'
    })
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