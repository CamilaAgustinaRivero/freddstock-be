const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({
    date: {
        type: Date,
        require: true
    },
    quantly: {
        type: Number,
        require: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    payment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }
});

module.exports = model('Transaction', TransactionSchema);