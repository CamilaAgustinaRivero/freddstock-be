const { response } = require('express');
const Transaction = require('../models/Transaction');
const Operation = require('../models/Operation')

const getTransactions = async (req, res = response) => {
    const transactions = await Transaction.find().populate(['operation_id', 'payment_id', 'product_id']).sort({date: -1});

    res.status(200).json({
        transactions
    });
}

const getTransactionsByDate = async (req, res = response) => {
    const { initial_date, final_date } = req.body;
    try {
        const transactions = await Transaction.find({
            date: {
                $gte: initial_date,
                $lte: final_date
            }
        }).populate(['operation_id', 'payment_id', 'product_id']);
        const operationId = await Operation.find({ name: 'Corrección'})
        const earns = await Transaction.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(initial_date),
                        $lte: new Date(final_date)
                    },                    
                }
            },
            {
                $group: {
                    _id: '$product_id',
                    total_quantity: {'$sum' : '$quantity'},
                    operation_id: {'$first' : '$operation_id'}
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: "$product",
            }
            ]).sort({ total_quantity: -1})
            const finalEarns = earns.map(t => {
                const finalEarn = t.product.sell_price * t.total_quantity- t.product.buy_price * t.product.stock
                return {
                    ...t,
                    total_earn: finalEarn,
                    product: {
                        ...t.product,
                    },
                }
            })

        if (!transactions) {
            res.status(404).send({
                msg: 'Transactions does not exist.'
            });
        } else {
            res.status(200).json({
                finalEarns: [...finalEarns],
                transactions: [...transactions]
            });
        }
        
    } catch (error) {
        res.status(500).send({
            msg: 'Internal server error.'
        });
    }
}

const createTransaction = async (req, res = response) => {
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

const updateTransaction = async (req, res = response) => {
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

        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, newTransaction);
        res.status(200).json({
            original: updatedTransaction
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const deleteTransaction = async (req, res = response) => {
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
    getTransactionsByDate,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};