import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';


function Signup() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState('');

    const navigateToLogin = () => {
        navigate("/");
    }

    const handleSignUp = async () => {
        try {
            if (password === rePassword) {
                const response = await axios.post('http://localhost:8090/api/v1/user/signup', {
                    username: username,
                    password: password
                });
                // console.log(response.data); // handle successful login response here
                if (response.data === true) {
                    navigate("/");
                } else {
                    // navigate("/signup");
                    setError("Sign up failed!");
                }
            }else{
                setError("Passwords do not match!!!");
            }


        } catch (error) {
            setError('Username already exists in the system!');
        }
    };
    return (
        <div className='form'>
            <div className='control'>
                <h1>
                    Sign Up
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
            <div className='control block-cube block-input'>
                <input
                    value={rePassword}
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={(ev) => setRePassword(ev.target.value)}
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
            <button className='btn block-cube block-cube-hover' onClick={handleSignUp}>
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
            <button className='btn block-cube block-cube-hover' onClick={navigateToLogin}>
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
        </div>
    );
}

export default Signup;