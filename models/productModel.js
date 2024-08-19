const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a product Name'],
    },

    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },

    status: {
        type: String,
        required: [true, 'Please add a status'],
        default: "Processing"
    },

    size: {
        type: Number,
        required: [true, 'Product must have a price'],
    },



}, { timestamps: true });






module.exports = mongoose.model("Product", productSchema);