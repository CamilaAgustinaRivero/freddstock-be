const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    buy_price: {
        type: Number,
        require: true,
    },
    sell_price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    code_bar: {
        type: String,
        require: true,
        unique: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    visibility: {
        type: Boolean,
        require: true,
    }
});

module.exports = model("Product", ProductSchema);
