/*
    Category routes / Categories
    host + /api/categories
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const router = Router();

router.get('/', getCategories);

router.post(
    '/',
    [
        check('name', 'Category name is required.').not().isEmpty(),
        validateFields
    ],
    createCategory
); 

router.put(
    '/:id',
    [
        check('name', 'Category name is required.').not().isEmpty(),
        validateFields
    ],
    updateCategory
);

router.delete('/:id', deleteCategory);

module.exports = router;