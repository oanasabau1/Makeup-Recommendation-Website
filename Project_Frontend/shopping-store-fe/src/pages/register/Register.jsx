import React, { useState } from 'react';
import './Register.css';
import { FaUserEdit, FaPhone, FaHome, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', {
        firstName,
        lastName,
        gender,
        birthDate,
        email,
        phoneNumber,
        address,
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
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
          <FaUserEdit className='icon'/>
        </div>
        <div className="input-box">
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
          <FaUserEdit className='icon'/>
        </div>
        <div className="input-box">
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option> 
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div className="input-box">
          <input type="date" placeholder="Birthdate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required/>
        </div>
        <div className="input-box">
          <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <MdEmail className="icon"/>
        </div>
        <div className="input-box">
          <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required pattern="[0-9]{10}"/>
          <FaPhone className="icon"/>
        </div>
        <div className="input-box">
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
          <FaHome className="icon"/>
        </div>
        <div className="input-box">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <RiLockPasswordFill className="icon"/>
        </div>
        <div className="error-message">{errorMessage}</div>
        <button type="submit">Register</button>
        <div className="login-link">
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Register;
