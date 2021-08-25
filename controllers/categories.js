const { response } = require('express');
const Category = require('../models/Category');

const getCategories = async(req, res = response) => {
    const categories = await Category.find();
    res.status(200).json({
        categories
    });
}

const createCategory = async (req, res = response) => {
    const category = new Category(req.body);
    try {
        const categorySaved = await category.save();
        res.status(201).json({
            category: categorySaved
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const updateCategory = async(req, res = response) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                msg: 'Category does not exist.'
            });
        }

        const newCategory = {
            ...req.body
        }

        const updatedCategory= await Category.findByIdAndUpdate(categoryId, newCategory);
        res.status(200).json({
            original: updatedCategory
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const deleteCategory = async(req, res = response) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                msg: 'Category does not exist.'
            });
        }

        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({
            msg: 'Deleted category.'
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};