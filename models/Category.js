const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        require: true,
    }
});

module.exports = model("Category", CategorySchema);
