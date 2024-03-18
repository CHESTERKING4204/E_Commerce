import React from 'react';
import '../index.css';
import AddProduct from './addProduct';
import SignUp from './SignUp';
import Product from './Product';
import Login from './Login';
import { Link } from 'react-router-dom';
import {LogOut} from '../context/useLogout';
import {useNavigate} from 'react-router-dom';
import {useAuthContext} from '../context/useAuthContext';

export function Nav() {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const {Logout} = LogOut();
    const handleSubmit = () => {
        Logout();
        navigate('/login');

    }

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
            <div>
                <h2><Link to='/'>Ted_World</Link></h2>
            </div>
            <div style={{ display: "flex", gap: "80px" }}>
                <h2><Link to='/addProduct'>Add Product</Link></h2>
                <h2><Link to='/product'>Product</Link></h2>
            </div>
            {!user && (<div>
                <h2><Link to='/login'>Login</Link></h2>
                <h2><Link to='/signUp'>SignUp</Link></h2>
            </div>
            )}
            {user &&(<div>
                <span>{user.email}</span>
                <h2 style={{cursor:"pointer"}} Link onClick={handleSubmit}>Log Out</h2>
            </div>
            )}
        </nav>
    )
};






export function Home() {
    return (
        <div>
            <h1>This is Home Page</h1>
        </div>
    )
}


export  {AddProduct,SignUp,Product,Login};

