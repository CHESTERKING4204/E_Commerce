import React from "react";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UserLogOut } from '../Hooks/UseLogout';
import { useAuthContext } from '../Hooks/useAuthContext'
import {useNavigate} from 'react-router-dom';

const NavBar = () => {

    const { logout } = UserLogOut();

    const { user } = useAuthContext();

    const navigate = useNavigate();
    const handleClick = () => {
        logout();
        navigate('/login');
    }

    console.log('User in Navbar:', user);

    return (
        <div className="bg-stone-950 flex justify-between items-center p-2 shadow-lg ">
            <div className="hover:cursor-pointer">
                <NavLink to='/'>
                    <img
                        src="https://wallpapers.com/images/high/black-and-purple-avengers-logo-z6e5k0kfqa1m0wwk.webp"
                        alt="Logo"
                        className="h-12 w-12 object-cover rounded-full shadow-md"
                    />
                </NavLink>
            </div>
            <div className="flex gap-2 text-white text-lg font-mono">
                <Link to='/' className="hover:bg-red-500 hover:font-bold transition ease-in-out duration-300 active:bg-red-700 px-4 py-2 rounded-xl">
                    Home
                </Link>
                <Link to='/product' className="hover:bg-red-500 hover:font-bold transition ease-in-out duration-300 active:bg-red-700 px-4 py-2 rounded-xl">
                    Product
                </Link>
                {!user && (
                    <div className="mt-2">
                        <Link to='/login' className="hover:bg-red-500 hover:font-bold transition ease-in-out duration-300 active:bg-red-700 px-4 py-2 rounded-xl">
                            LogIn
                        </Link>
                        <Link to='/signup' className="hover:bg-red-500 hover:font-bold transition ease-in-out duration-300 active:bg-red-700 px-4 py-2 rounded-xl">
                            SignUp
                        </Link>
                    </div>
                )}
                {user && (
                    <div className="">
                        <Link to='/cart' className="hover:bg-red-500 hover:font-bold transition ease-in-out duration-300 active:bg-red-700 px-4 py-2 rounded-xl">
                            Cart
                        </Link>
                        <Link to='/addProduct' className="hover:bg-red-500 hover:font-bold transition ease-in-out duration-300 active:bg-red-700 px-4 py-2 rounded-xl">
                            Add Product
                        </Link>
                        <button onClick={handleClick} className="hover:bg-red-500 hover:rounded-xl hover:text-black hover:font-bold transition ease-in-out duration-300 active:bg-red-700 px-4 py-2 rounded-xl">
                            LogOut
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;
