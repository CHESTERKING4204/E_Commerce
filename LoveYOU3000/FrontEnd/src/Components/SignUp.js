import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import {useAuthContext} from '../Hooks/useAuthContext';

const SignUpPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);
  // const {dispatch} = useAuthContext()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(null);

    const addUser = { firstname, lastname, email, password};

    const response = await fetch("http://localhost:4000/user/signin", {
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
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      // localStorage.setItem('user', JSON.stringify(result));
      // dispatch({ type: 'LOGIN', payload: result });
      // setloading(false);

      navigate('/login');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200
                    bg-[url(https://wallpapers.com/images/hd/avengers-age-of-ultron-svj5n82tb13zabbi.webp)]
                    bg-no-repeat bg-cover bg-center">
      <div className="p-10 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white"><span className="text-black">Sign</span> Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-white font-semibold mb-2">
              First <span className="text-black">Name</span>
            </label>
            <input
              className="border border-gray-400 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-white font-semibold mb-2" >
              Last Name
            </label>
            <input
              className="border border-gray-400 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-white font-semibold mb-2">
              Email
            </label>
            <input
              className="border border-gray-400 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-white font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                className="border border-gray-400 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
          {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        </form>
        <p className="text-center text-white text-sm font-bold mt-8">
          Already have an account? <a href="/login" className="text-green-500 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
