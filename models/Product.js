const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Product', productSchema);