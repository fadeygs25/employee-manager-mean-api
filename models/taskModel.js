const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const taskSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a task Name'],
    },


    description: {
        type: String,
        required: [true, 'Please add a task Name'],
    },

    projectId: {
        type: String,
        required: [true, 'Please add a task Name'],
    },

    userId: {
        type: String,
        required: [true, 'Please add a task Name'],
    },

    priority: {
        type: String,
        required: [true, 'Please add a task Name'],
    },

    status: {
        type: String,
        required: [true, 'Please add a status'],
        default: "Processing"
    },


}, { timestamps: true });






module.exports = mongoose.model("Task", taskSchema);