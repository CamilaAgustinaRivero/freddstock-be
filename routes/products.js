/*
    Product routes / Products
    host + /api/products
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields');
const { isPositive } = require('../helpers/isPositive');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const router = Router();

router.get('/:page', getProducts);

router.post(
    '/',
    [
        check('name', 'Product name is required.').not().isEmpty(),
        check('brand', 'Brand is required.').not().isEmpty(),
        check('buy_price', 'Buy price must be a number.').isNumeric(),
        check('sell_price', 'Sell price must be a number.').isNumeric(),
        check('stock', 'Stock must be a positive integer.').custom(isPositive),
        validateFields
    ],
    createProduct
);

router.put(
    '/:id',
    [
        check('name', 'Product name is required.').not().isEmpty(),
        check('brand', 'Brand is required.').not().isEmpty(),
        check('buy_price', 'Buy price must be a number.').isNumeric(),
        check('sell_price', 'Sell price must be a number.').isNumeric(),
        check('stock', 'Stock must be a positive integer.').custom(isPositive),
        validateFields
    ],
    updateProduct
);

router.delete('/:id', deleteProduct);

module.exports = router;