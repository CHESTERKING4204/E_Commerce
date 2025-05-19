const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
    { timestamps: true }
);


const userInfo = mongoose.model('userInfo', userSchema);

module.exports = userInfo;