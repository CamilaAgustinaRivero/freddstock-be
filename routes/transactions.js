/*
    Transaction routes / Transaction
    host + /api/transactions
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields');
const { getTransactions, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactions');
const router = Router();

router.get('/', getTransactions);

router.post(
    '/',
    [
        check('quantly', 'Quantly must be an integer.').isInt(),
        validateFields
    ],
    createTransaction
);

router.put(
    '/:id',
    [
        check('quantly', 'Quantly must be an integer.').isInt(),
        validateFields
    ],
    updateTransaction
);

router.delete('/:id', deleteTransaction);

module.exports = router;