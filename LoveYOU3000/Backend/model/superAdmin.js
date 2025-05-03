const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        index:true
    },
    products: [
        {
            product_Id:{
                type:String,
                required:true
            },
            product: {
                type: String, 
                required: true,
                index : true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            imagePic:{
                type:String,
                required:true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
