const { response } = require('express');
const Operation = require('../models/Operation');

const getOperations = async (req, res = response) => {
    const operations = await Operation.find();
    res.status(200).json({
        operations
    });
}

const createOperation = async (req, res = response) => {
    const operation = new Operation(req.body);
    try {
        const operationSaved = await operation.save();
        res.status(201).json({
            operation: operationSaved
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const updateOperation = async (req, res = response) => {
    const operationId = req.params.id;

    try {
        const operation = await Operation.findById(operationId);
        if (!operation) {
            return res.status(404).json({
                msg: 'Operation does not exist.'
            });
        }

        const newOperation = {
            ...req.body
        }

        const updatedOperation = await Operation.findByIdAndUpdate(operationId, newOperation);
        res.status(200).json({
            original: updatedOperation
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const deleteOperation = async (req, res = response) => {
    const operationId = req.params.id;

    try {
        const operation = await Operation.findById(operationId);
        if (!operation) {
            return res.status(404).json({
                msg: 'Operation does not exist.'
            });
        }

        await Operation.findByIdAndDelete(operationId);
        res.status(200).json({
            msg: 'Deleted operation.'
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

module.exports = {
    getOperations,
    createOperation,
    updateOperation,
    deleteOperation,
};