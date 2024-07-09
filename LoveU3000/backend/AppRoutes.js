const express = require('express');
const User = require('./model/user.js');
const Product = require('./model/product.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const validator = require('validator');
const requireAuth = require('./middleware/requireAuth.js');

const createToken = (_id) => {
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'3d'});
}

const route = express.Router();

//For Authorization of the website - Uncomment the below portion
// route.use(requireAuth);


//POST for user
route.post('/user/signin', async (request, response) => {
    try {
        const {firstname, lastname, email, password } = request.body;
        if(!password || !firstname || !lastname){
            throw Error('All Fields are required!!')
        }
        // if(!validator.email){
        //     throw Error('!! This Type of Email is NOT VALID !!');
        // }
        const exist = await User.findOne({email});
        if(exist){
            throw Error('This Email already Exist Try some another one!!');
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const userInfo = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash
        });
        const token = createToken(userInfo._id);
        response.status(201).json({userInfo,token});
    }catch(error){
        console.log('POST user error');
        return response.status(404).json({message:error.message});
    }
});

//For the login credentials
route.post('/user/login',async (request,response)=>{
    try{
        const {email,password} = request.body;
        if(!email || !password){
            throw Error('All the fields are necessary!!');
        }
        const user = await User.findOne({email});

        if(!user){
            throw Error('No such Email Exist');
        }

        const see = user.password;
        const token = createToken(user._id);
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            throw Error('Password Incorrect');
        }
        response.status(201).json({email,token,see});
        // response.status(201).json({email,token,see,password});  /*This line can be used to see both the real and the hashed password*/
    }catch(error){
        console.log('Get The user error');
        return response.status(404).json({message:error.message});
    }
})

//POST for product
route.post('/product',async (request,response)=>{
    try{
        const {title,price,image,desc} = request.body;

        const product = await Product.create({
            title:title,
            price:price,
            imageUrl:image,
            description:desc            
        })
        response.status(201).json(product)
    }catch(error){
        console.log(error);
        response.status(404).json({message:error.message});
    }
});

//GET for all user
// route.get('/user/signin',async (request,response)=>{
//     try{
//         const showUser = await User.find();
//         response.status(201).json(showUser);
//     }catch(error){
//         console.log(error);
//         response.status(404).json({message:error.message});
//     }
// });

//GET for all product
route.get('/product',async (request,response)=>{
    try{
        const showProduct = await Product.find();
        response.status(201).json(showProduct);
    }catch(error){
        console.log(error);
        response.status(404).json({message:error.message});
    }
});

//GET for particular product
route.get('/product/:id',async (request,response)=>{
    const {id} = request.params;
    const prod = await Product.findById(id);
    console.log(prod);
    response.status(201).json(prod);
})

//GET for particular ID
route.get('/user/signin/:id',async (request,response)=>{
    const {id} = request.params;
    const user = await User.findById(id);
    console.log(user);
    response.status(201).json(user);
})

//DELETE for particular product
route.delete('/product/:id',async (request,response)=>{
    try{
        const {id} = request.params;
    const del = await Product.findByIdAndDelete(id);
    console.log(del);
    response.status(201).json(del);
    }catch(error){
        console.log(error);
        response.status(404).json({message:error.message});
    }
});



module.exports = route;