/*
    User routes / Products
    host + /api/products
*/

const { Router } = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const router = Router();

router.get('/', getProducts);

router.post('/', createProduct); 

router.put('/:id', updateProduct);


router.delete('/:id', deleteProduct);

module.exports = router;