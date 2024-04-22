// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const navigateToSignup = () => {
        navigate("/signup");
    }

    const handleLogin = async () => {
        try {
            
            const response = await axios.post('http://localhost:8090/api/v1/user/login', {
                username: username,
                password: password
            });
             // handle successful login response here
            if(response.data.status === true){
                // console.log("username: " + username);
                navigate("/home", {state: username});
            }else{
                // navigate("/signup");
                setError(response.data.message);
            }

        } catch (error) {
            setError('Invalid username or password');
        }
    };
    return (
        <div className='form' >
            <div className='control'>
                <h1>
                    Sign In
                </h1>
            </div>
            {error && <div>{error}</div>}
            <br/>
            <div className='control block-cube block-input'>
                
                <input
                    value={username}
                    name='username'
                    placeholder='Username'
                    type='text'
                    onChange={(ev) => setUserName(ev.target.value)}
                ></input>
                <div className='bg-top'>
                    <div className='bg-inner'></div>
                </div>
                <div className='bg-right'>
                    <div className='bg-inner'></div>
                </div>
                <div className='bg'>
                    <div className='bg-inner'></div>
                </div>
            </div>
            <div className='control block-cube block-input'>
                <input
                    value={password}
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={(ev) => setPassword(ev.target.value)}
                ></input>
                <div className='bg-top'>
                    <div className='bg-inner'></div>
                </div>
                <div className='bg-right'>
                    <div className='bg-inner'></div>
                </div>
                <div className='bg'>
                    <div className='bg-inner'></div>
                </div>
            </div>
            <button className='btn block-cube block-cube-hover' type='submit' onClick={handleLogin}>
                <div className='bg-top'>
                    <div className='bg-inner'></div>
                </div>
                <div className='bg-right'>
                    <div className='bg-inner'></div>
                </div>
                <div className='bg'>
                    <div className='bg-inner'></div>
                </div>
                <div className='text'>
                    Log In
                </div>
            </button>
            <button className='btn block-cube block-cube-hover' type='button' onClick={navigateToSignup}>
                <div className='bg-top'>
                    <div className='bg-inner'></div>
                </div>
                <div className='bg-right'>
                    <div className='bg-inner'></div>
                </div>
                <div className='bg'>
                    <div className='bg-inner'></div>
                </div>
                <div className='text'>
                    Sign Up
                </div>
            </button>
        </div>
    );
}

export default Login;