const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({
    operation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Operation',
        required: true
    },
    payment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantly: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('Transaction', TransactionSchema);