const { Schema, model } = require('mongoose');

const OperationSchema = Schema({
    name: {
        type: String,
        require: true,
    }
});

module.exports = model('Operation', OperationSchema);