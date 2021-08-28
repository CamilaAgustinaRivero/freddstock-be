const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    brand: {
        type: String,
        require: true
    },
    buy_price: {
        type: Number,
        default: 0
    },
    sell_price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: '[Descripcion]'
    },
    code_bar: {
        type: String,
        default: '[Código de barras]'
    },
    stock: {
        type: Number,
        default: 0
    },
    visibility: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Product', ProductSchema);
