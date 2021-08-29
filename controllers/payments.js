const { response } = require('express');
const Payment = require('../models/Payment');

const getPayments = async (req, res = response) => {
    const payments = await Payment.find();
    res.status(200).json({
        payments
    });
}

const createPayment = async (req, res = response) => {
    const payment = new Payment(req.body);
    try {
        const paymentSaved = await payment.save();
        res.status(201).json({
            payment: paymentSaved
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const updatePayment = async (req, res = response) => {
    const paymentId = req.params.id;

    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({
                msg: 'Payment does not exist.'
            });
        }

        const newPayment = {
            ...req.body
        }

        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, newPayment);
        res.status(200).json({
            original: updatedPayment
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

const deletePayment = async (req, res = response) => {
    const paymentId = req.params.id;

    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({
                msg: 'Payment does not exist.'
            });
        }

        await Payment.findByIdAndDelete(paymentId);
        res.status(200).json({
            msg: 'Deleted payment.'
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        });
    }
}

module.exports = {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment,
};