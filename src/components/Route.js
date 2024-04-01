import React from "react"
import { Route, Routes } from 'react-router-dom';

import {Login,Home,Product,AddProduct,SignUp} from './all.js';


export default function Routers() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>
    )
};