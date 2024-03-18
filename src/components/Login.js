import React,{useState} from 'react';
import {useAuthContext} from '../context/useAuthContext';
import {useNavigate} from 'react-router-dom';


const Login = () => {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState(null);
    const [IsLoading , setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const addUser = { email, password };
        setError(null);
        setIsLoading(true);

        const response = await fetch('http://localhost:5000/login', {
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
            navigate('/login');
        } else {
            //store the data in the local storage 
            localStorage.setItem('user',JSON.stringify(result));
            console.log(result);
            
            //dispatch the action -> giving the current state to the reducer to work on and then change the application according to this
            dispatch({type:'LOGIN',payload:result});
            setIsLoading(false);

            //will naviagte the page to the login page 
            navigate('/');
        }
    }

    
    return (
        <div style={{ backgroundColor: "blue", overflow: "hidden", height: "100vh" }}>
            <div style={{ margin: "150px" }} >
                <div className='login_box'>
                    <form className='form' id='login_form' onSubmit={handleSubmit}>
                        <h1>Email</h1>
                        <input className="input" type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                        <h1>Password</h1>
                        <input className="input" type='password'value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                        <button disabled={IsLoading} style={{ marginTop: "8vh", width: "15vw", height: "5vh", borderRadius: "10px", fontSize: "20px", cursor: "pointer" }}>Login</button>
                        {error && <div style={{color:"red",backgroundColor:"white"}}>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    )
};


export default Login;