const mongoose = require("mongoose")

const todoschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    number : Number
});

module.exports = todoschema;