const { Schema, model } = require("mongoose");

const BrandSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    product_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
})

module.exports = model("Brand", BrandSchema);
