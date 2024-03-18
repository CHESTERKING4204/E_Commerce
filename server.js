const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute.js');
const cors = require('cors');

app.use(cors());

app.use(express.json());

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

mongoose.connect(process.env.URI)
    .then(() => {
        console.log('Successfully Established');
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err, 'This is the PORT error');
            console.log('Succefully connected to the server', process.env.PORT || 8000);
        })
    }).catch((err) => {
        console.log(err, 'This is the main error');
    });

app.use(userRoute);










