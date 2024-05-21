import React, { useState } from 'react';
import './Login.css';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password
      });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.response.data); 
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          <FaRegUser className='icon'/>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <RiLockPasswordLine className='icon'/>
        </div>
        <div className="error-message">{errorMessage}</div>
        <button className="login-btn" type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
      </form> 
    </div>
  )
}

export default Login;
