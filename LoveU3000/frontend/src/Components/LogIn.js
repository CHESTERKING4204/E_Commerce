import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from '../Hooks/useAuthContext'


const Login = () => {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [error,seterror] = useState(null);
  const [loading,setloading] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  
  const handleChange = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(null);

    const addUser = { email, password };

    const response = await fetch("http://localhost:4000/user/login", {
      method: 'POST',
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setloading(false);
      seterror(result.error);

    } else {
      console.log(result);
      setEmail("");
      setPassword("");

      localStorage.setItem('user', JSON.stringify(result));

      dispatch({ type: 'LOGIN', payload: result });
      setloading(false);

      navigate('/');
    }
  }


  /*For the best picture to make the screen show
  https://wallpapers.com/images/high/loki-and-staff-artwork-ka3fjakzzuf4kf19.webp
  https://wallpapers.com/images/high/digital-art-loki-3r3d2fz7ecztxs84.webp
  */
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100
                     bg-[url(https://wallpapers.com/images/high/loki-and-staff-artwork-ka3fjakzzuf4kf19.webp)]
                    bg-no-repeat bg-cover bg-center ">
      <div className=" p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-blur-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center textblack">Log In</h2>
        <form onSubmit={handleChange}>
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Email
            </label>
            <input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2">
              Password
            </label>
            <input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={loading}
            >
              Log In
            </button>
          </div>
          {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        </form>
        <p className="text-center text-black text-sm mt-6 font-bold rounded-md">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
