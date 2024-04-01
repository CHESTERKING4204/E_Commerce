const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/User.js');
const product = require('../models/product.js');

const jwt = require('jsonwebtoken');

const route = express.Router();

const createToken = (_id) => {
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'1d'})
}

//creating the post request for the login page
route.post('/login',async (req,res)=>{
    const {email,password} = req.body;

    try{

        const User = await user.login(email,password);

        const Token = createToken(User._id);

        res.status(201).json({email,Token});

    }catch(error){
        
        console.log('Cannot access the login code');
        res.status(400).json({mssg:'The Bad Request for login bro!!',error:error.message});
    }
});

//post for userID
route.post('/user', async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    try {

        //*********************-------FOR EASE REMOVING THE VALID PASSWORD AND VALID EMAIL FROM THE CODE[IN USER.JS]------*********************//

            const User = await user.signup(email,password);
            console.log('We hashed the password to ',User.password);

            const addUser = await user.create({
                firstname: firstname,
                lastname: lastname,
                email: User.email,
                password:User.password
            });
            const token = createToken(addUser._id); 
            res.status(201).json({firstname,lastname,email,token});// placing the token in the in place of the addUser it is sending a string instead of the data that previously was sent by the user 
    } catch (error) {
        console.log('UserInput error');
        res.status(400).json({ error: error.message });
    }
});

//post for product
route.post('/product', async (req, res) => {

    const { title, price, imageUrl, description } = req.body;

    try {
        const addProduct = await product.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        });
        res.status(201).json(addProduct);
    } catch (error) {
        console.log('ProductInput error', error);
        res.status(400).json({ error: error.message });
    }
});

//get for user - As we dont have to show all the user to any body 
route.get('/user', async (req, res) => {
    try {
        const showAll = await user.find();
        res.status(201).json(showAll);
    } catch (error) {
        console.log('This is user get error', error);
        res.status(400).json({ error: error.message });
    }
});

//get for product
route.get('/product', async (req, res) => {
    try {
        const showAllProduct = await product.find();
        return res.status(201).json(showAllProduct);
    } catch (error) {
        console.log('This is product get error', error);
        res.status(400).json({ error: error.message });
    }
});

//get the info of 1 user using id
route.get('/user/:_id', async (req, res) => {
    const { _id } = req.params;

    try {
        const singleUser = await user.findById(_id);
        return res.status(201).json(singleUser);
    } catch (error) {
        console.log(error, 'Get IndividualUser error');
        res.status(400).json({ error: error.message });
    }
});

//get the info of 1 product using id
route.get('/product/:_id', async (req, res) => {
    const { _id } = req.params;

    try {
        const singleProduct = await product.findById(_id);
        return res.status(201).json(singleProduct);
    } catch (error) {
        console.log(error, 'get IndividualProduct error')
        res.status(400).json({ error: error.message });
    }
});

//update the product
route.patch('/product/:id', async (req, res) => {
    const { id } = req.params;
    const { title, price, imageUrl, description } = req.body;

    try {
        const updateData = await product.findByIdAndUpdate(id, {
            title,
            price,
            imageUrl,
            description
        }, {
            new: true
        });

        res.status(200).json(updateData);
    } catch (error) {
        console.log(error, 'Product Update error');
        res.status(500).json({ error: error.message });
    }
});


//delet a product via id
route.delete('/product/:_id', async (req, res) => {
    const { _id } = req.params;

    try {
        const deleteProduct = await product.findByIdAndDelete(_id);
        res.status(200).json(deleteProduct);
    } catch (error) {
        console.log(error, 'Product Delete error');
        res.status(500).json({ error: error.message });
    }
});

route.delete('/user/:_id', async (req, res) => {
    const { _id } = req.params;

    try {
        const deleteProduct = await user.findByIdAndDelete(_id);
        res.status(200).json(deleteProduct);
    } catch (error) {
        console.log(error, 'Product Delete error');
        res.status(500).json({ error: error.message });
    }
});


module.exports = route;