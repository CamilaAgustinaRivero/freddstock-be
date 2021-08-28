const { response } = require('express');
const Transaction = require('../models/Transaction');

const getTransactions = async(req, res = response) => {
    const transactions = await Transaction.find().populate(['operation_id', 'payment_id', 'product_id']);
    res.status(200).json({
        transactions
    });
}

const createTransaction = async(req, res = response) => {
   const transaction = new Transaction(req.body);
    try {
        await transaction.save();
        res.status(201).json({
            transaction
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const updateTransaction = async(req, res = response) => {
    const transactionId = req.params.id;

    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({
                msg: 'Transaction does not exist.'
            });
        }

        const newTransaction = {
            date: transaction.date,
            ...req.body,
        }

        res.json({
            newTransaction
        })

        /*const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, newTransaction);
        res.status(200).json({
            original: updatedTransaction
        });*/

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const deleteTransaction = async(req, res = response) => {
    const transactionId = req.params.id;

    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({
                msg: 'Transaction does not exist.'
            });
        }

        await Transaction.findByIdAndDelete(transactionId);
        res.status(200).json({
            msg: 'Deleted transaction.'
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};