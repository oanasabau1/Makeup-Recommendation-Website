import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
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

  const handleLogout = async () => {
    try {
      console.log(user.username);
      await axios.post(`http://localhost:8080/logout?username=${user.username}`);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>User Profile</h1>
        {error ? (
          <p>{error}</p>
        ) : user ? (
          <div>
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" value={user.firstName} readOnly />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" value={user.lastName} readOnly />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <input type="text" value={user.gender} readOnly />
            </div>
            <div className="form-group">
              <label>Birth Date:</label>
              <input type="text" value={user.birthDate} readOnly />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={user.email} readOnly />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="text" value={user.phoneNumber} readOnly />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input type="text" value={user.address} readOnly />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" value={user.username} readOnly />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" value={user.password} readOnly />
            </div>
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>
      <div className="button-container">
        <div>
          <Link to={`/user/update/${userId}`}>
            <button>Update Profile</button>
          </Link>
        </div>
        <div>
          <Link to="/" onClick={handleLogout}>
            <button>Logout</button>
          </Link>
        </div>
        {user && user.userRole === 'ADMIN' && ( 
          <div>
            <Link to="/admin">
              <button>Admin Page</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
