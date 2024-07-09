const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const AppRouter = require('./AppRoutes');
const cors = require('cors');

dotenv.config();

app.use(express.json())
app.use(cors());

mongoose.connect(process.env.URI)
    .then(()=>{
        console.log('mongo Connect');
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err, 'This is the PORT error');
            console.log('Succefully connected to the server', process.env.PORT || 8000);
        })
    }).catch((err) => {
        console.log(err, 'This is the main error');
    });

app.use(AppRouter);
