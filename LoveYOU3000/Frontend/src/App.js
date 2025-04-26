import React from 'react';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Product from './Components/Product';
import AddProduct from './Components/AddProduct';
import Login from './Components/LogIn';
import SignUp from './Components/SignUp';
import Cart from './Components/Cart';
import ViewProduct from './Components/ViewProduct';
import {Routes , Route,Navigate} from 'react-router-dom'
import {useAuthContext} from './Hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/product' element = {<Product />}/>
        <Route path='/addProduct' element = {user ? <AddProduct />:<Navigate to='/login' />}/>
        <Route path='/login' element = {!user ? <Login />:<Navigate to='/' />}/>
        <Route path='/SignUp' element = {!user ? <SignUp />:<Navigate to='/' />}/>
        <Route path='/Cart' element = {user ? <Cart />:<Navigate to='/login' />}/>
        <Route path='/product/:id' element = {<ViewProduct />} />
      </Routes>
    </div>
  );
}

export default App;
