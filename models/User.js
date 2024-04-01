const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
},
    {timestamps:true}
);

userSchema.statics.signup = async function(email,password){
    //********Commenting Out the valid email and passsword column for ease*******************/
    
    // if(!email || !password){
    //     throw Error('Not the valis credentials');
    // }

    // if(!validator.isEmail(email)){
    //     throw Error('Not a valid Email');
    // }

    // if(!validator.isStrongPassword(password)){
    //     throw Error('Not a string password');
    // }

    const newUser = { email, password };

    // Hash the password
    newUser.password = await bcrypt.hash(password, 10);

    // Save the new user to the database

    return newUser;
}




userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('Not the valid credentials');
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error('Cant Find the email');
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
        throw Error('Incorrect Password');
    }
    return user;
}


const userInfo = mongoose.model('userInfo',userSchema);

module.exports = userInfo;