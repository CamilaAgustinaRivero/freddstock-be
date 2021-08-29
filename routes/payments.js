/*
    Payment routes / Payments
    host + /api/payments
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields');
const { getPayments, createPayment, updatePayment, deletePayment } = require('../controllers/Payments');
const router = Router();

router.get('/', getPayments);

router.post(
    '/',
    [
        check('name', 'Payment name is required.').not().isEmpty(),
        validateFields
    ],
    createPayment);

router.put(
    '/:id',
    [
        check('name', 'Payment name is required.').not().isEmpty(),
        validateFields
    ],
    updatePayment
);

router.delete('/:id', deletePayment);

module.exports = router;