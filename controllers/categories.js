const { response } = require('express');
const Category = require('../models/Category');

const getCategories = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Get categories list'
    })
}

const createCategory = async (req, res = response) => {
    const category = new Category(req.body);
    try {
        const categorySaved = await category.save();
        res.json({
            ok: true,
            category: categorySaved
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}

const updateCategory = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Update a category'
    });
}

const deleteCategory = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete a category'
    })
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};