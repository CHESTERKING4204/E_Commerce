const express = require('express');
const User = require('./model/user.js');
const Product = require('./model/product.js');
const Cart = require('./model/Cart.js');
const Order = require('./model/superAdmin.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const validator = require('validator');
const requireAuth = require('./middleware/requireAuth.js');

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '1d' });
}

const route = express.Router();

//For Authorization of the website - Uncomment the below portion
// route.use(requireAuth);


//POST for user
route.post('/user/signin', async (request, response) => {
  try {
    const { firstname, lastname, email, password} = request.body; // include isAdmin
    if (!password || !firstname || !lastname) {
      throw Error('All Fields are required!!');
    }

    const exist = await User.findOne({ email });
    if (exist) {
      throw Error('This Email already Exists. Try another one!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // console.log(isAdmin);
    const userInfo = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
      // isAdmin: isAdmin || false // default to false if not provided
    });

    const token = createToken(userInfo._id);
    response.status(201).json({ userInfo, token });
  } catch (error) {
    console.log(error);
    console.log('POST user error');
    return response.status(404).json({ message: error.message });
  }
});


//For the login credentials
route.post('/user/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      throw Error('All the fields are necessary!!');
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw Error('No such Email Exist');
    }

    const see = user.password;
    const token = createToken(user._id);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error('Password Incorrect');
    }
    response.status(201).json({ email, token, see });
    // response.status(200).json({ _id: user._id, email: user.email, token });
    // response.status(201).json({email,token,see,password});  /*This line can be used to see both the real and the hashed password*/
  } catch (error) {
    console.log(error);
    console.log('Get The user error');
    return response.status(404).json({ message: error.message });
  }
})

//POST for product
route.post('/product', async (request, response) => {
  try {
    const { title, price, image, desc, tag } = request.body;

    const product = await Product.create({
      title: title,
      price: price,
      imageUrl: image,
      description: desc,
      tag: tag
    })
    response.status(201).json(product)
  } catch (error) {
    console.log(error);
    response.status(404).json({ message: error.message });
  }
});

//GET for all user
route.get('/user/signin', async (request, response) => {
  try {
    const showUser = await User.find();
    response.status(201).json(showUser);
  } catch (error) {
    console.log(error);
    response.status(404).json({ message: error.message });
  }
});

//GET for all product
route.get('/product', async (request, response) => {
  try {
    const showProduct = await Product.find();
    response.status(201).json(showProduct);
  } catch (error) {
    console.log(error);
    response.status(404).json({ message: error.message });
  }
});

//GET for particular product
route.get('/product/:id', async (request, response) => {
  const { id } = request.params;
  const prod = await Product.findById(id);
  console.log(prod);
  response.status(201).json(prod);
})

//GET for particular ID
route.get('/user/signin/:id', async (request, response) => {
  const { id } = request.params;
  const user = await User.findById(id);
  console.log(user);
  response.status(201).json(user);
})

route.get('/cart', async (request, response) => {
  try {
    const showCartProduct = await Cart.find();
    response.status(201).json(showCartProduct);
  } catch (error) {
    console.log(error);
    response.status(404).json({ message: error.message });
  }
})

// route.post('/cart/:id',async (request,response)=>{
//     try{
//         const {Id} = req.params;
//         const exist = await Cart.findbyId(Id);
//         console.log(Id);
//         console.log(exist);
//         if(exist){
//             return res.status(400).json({ message: 'Product is already in the cart' });
//         }
//         const {title,price,imageUrl,description} = request.body;
//         const product = await Cart.create({
//             title:title,
//             price:price,
//             imageUrl:imageUrl,
//             description:description            
//         })
//         response.status(201).json(product)
//     }catch(error){
//         console.log(error);
//         response.status(404).json({message:error.message});
//     }
// });

route.post('/cart/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const exist = await Cart.findOne({ productId: productId });

    if (exist) {
      return res.status(400).json({ message: 'Product is already in the cart' });
    }

    const { title, price, imageUrl, description } = req.body;

    const product = await Cart.create({
      productId: productId,
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      quantity: 1,
    });

    // Return the newly added product
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});


//DELETE for particular product Route
route.delete('/product/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const del = await Product.findByIdAndDelete(id);
    console.log(del);
    response.status(201).json(del);
  } catch (error) {
    console.log(error);
    response.status(404).json({ message: error.message });
  }
});

// route.delete('/cart/:id', async (request, response) => {
//     try {
//       const  id  = request.params.id;
//       const del = await Cart.findByIdAndDelete(id);
//       console.log(del);
//       response.status(201).json(del);
//     } catch (error) {
//       console.log(error);
//       response.status(404).json({ message: error.message });
//     }
//   });
route.delete('/cart/:id', async (request, response) => {
  try {
    const id = request.params.id;
    console.log("Deleting item with ID:", id);

    // Find and delete the item by its ID
    const del = await Cart.findByIdAndDelete(id);

    // If no document was found with that ID
    if (!del) {
      return response.status(404).json({ message: 'Item not found' });
    }

    console.log("Deleted item:", del);
    response.status(200).json(del);
  } catch (error) {
    console.log("Error:", error); // Log any errors
    response.status(500).json({ message: error.message });
  }
});

//Check the Tag in the backend
route.get('/product/search', async (req, res) => {
  try {
    const { tags } = req.query;

    let tagArray = tags;
    if (typeof tags === 'string') {
      tagArray = [tags];
    }

    // Build array of regex queries
    const regexQueries = tagArray.map((tag) => ({
      tags: { $regex: tag, $options: 'i' }
    }));

    const products = await Product.find({
      $or: regexQueries
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update product by ID
route.put('/product/:id', async (req, res) => {
  console.log("PUT /product/:id HIT");
  console.log("ID:", req.params.id);  
  console.log("Body:", req.body);   

  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});


// POST /api/orders - Create a new order
route.post('/api/orders', async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;

    if (!user || !Array.isArray(products) || products.length === 0 || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      user,
      products,
      totalAmount
    });
    console.log(newOrder);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
});

// GET /api/orders - Get all orders (for super admin)
route.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'email') // populating user email
      .populate('products.product', 'title price imageUrl tag'); // populating product details

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
});

// route.get('/orders', async (req, res) => {
//   const { sort } = req.query; // Get the sort option from query parameter
//   let orders;

//   try {
//       if (sort === 'user') {
//           orders = await Order.find().sort({ user: 1 }); // Sort by user email
//       } else if (sort === 'product') {
//           orders = await Order.aggregate([
//               { $unwind: '$products' },
//               { $sort: { 'products.product': 1 } },
//           ]);
//       } else if (sort === 'user-product') {
//           orders = await Order.aggregate([
//               { $unwind: '$products' },
//               { $sort: { 'user': 1, 'products.product': 1 } }
//           ]);
//       } else {
//           orders = await Order.find(); // Default return all orders
//       }

//       res.json(orders);
//   } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// Delete an order
route.delete('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.findByIdAndDelete(orderId); // Delete the order from the database
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = route;