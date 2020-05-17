const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true    
    },
    image:{
        type: String,
        required: true 
    },
    user_id:{
        type: String,
        required: true 
    }
});

module.exports = POST = mongoose.model("post", postSchema);