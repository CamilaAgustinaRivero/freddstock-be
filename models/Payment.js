const { Schema, model } = require('mongoose');

const PaymentSchema = Schema({
    name: {
        type: String,
        require: true
    }
});

module.exports = model('Payment', PaymentSchema)