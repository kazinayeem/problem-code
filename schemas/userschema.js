const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
   
    password : {
        type: String,
        required: true
    },
 
});

module.exports = userschema;