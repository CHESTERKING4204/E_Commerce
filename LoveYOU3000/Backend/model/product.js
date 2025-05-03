const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        // index:true,
        required:true
    }
},
    {timestamps:true}
);

const Product = mongoose.model('Product',userSchema);

module.exports = Product;