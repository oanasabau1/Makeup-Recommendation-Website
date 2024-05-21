import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link component
import './UpdateProfile.css';

const UpdateProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('An error occurred while fetching user profile.');
      }
    };

    fetchUserProfile();
  }, [userId]);

  const updateUserDetails = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/user/update/${userId}`, user);
      console.log(response.data); // Log response message
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div className="container">
      <h1>User Profile</h1>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="form-group">
            <label>Birth Date:</label>
            <input type="date" value={user.birthDate} onChange={(e) => setUser({ ...user, birthDate: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="text" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={user.password} readOnly />
          </div>
          <Link to={`/user/profile/${userId}`}>
            <button onClick={updateUserDetails}>Update</button>
          </Link>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UpdateProfile;
