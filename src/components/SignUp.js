import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../context/useAuthContext.js';


const SignUp = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState(null);
    const [IsLoading , setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const navigate = useNavigate();


    const handleChange = async (e) => {
        e.preventDefault();

        const addUser = { firstname, lastname, email, password };
        setError(null);
        setIsLoading(true);

        const response = await fetch('http://localhost:5000/user', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setIsLoading(false);
            setError(result.error);
            navigate('/signup');
        } else {
            //store the data in the local storage 
            localStorage.setItem('user',JSON.stringify(result));
            console.log(result);
            
            //dispatch the action -> giving the current state to the reducer to work on and then change the application according to this
            dispatch({type:'LOGIN',payload:result});
            setIsLoading(false);

            //will naviagte the page to the login page 
            navigate('/login');
        }
    }



    return (
        <div>
            <div style={{ margin: "10vh 10vw", backgroundColor: "red", alignContent: "center", padding: "25px", borderRadius: "20px" }}>
                <form id='SignUp_form' style={{ marginLeft: "25vw" }} onSubmit={handleChange}>
                    <div>
                        <h1>First Name</h1>
                        <input className='input' type='First Name' name='First Name' value={firstname} onChange={e => { setFirstname(e.target.value) }} />
                    </div>
                    <div>
                        <h1>Last Name</h1>
                        <input className='input' type='lastname' name='lastname' value={lastname} onChange={e => { setLastname(e.target.value) }} />
                    </div>
                    <div>
                        <h1>Email</h1>
                        <input className='input' type='email' name='email' value={email} onChange={e => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <h1>Password</h1>
                        <input className='input' type='password' name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button type='submit' style={{ marginTop: "8vh", width: "15vw", height: "5vh", borderRadius: "10px", fontSize: "20px", cursor: "pointer" }} disabled={IsLoading}>Submit</button>
                    {error&&<div style={{color:"red",backgroundColor:"white"}}>{error}</div>}    
                </form>
            </div>
        </div>
    )
}

export default SignUp;