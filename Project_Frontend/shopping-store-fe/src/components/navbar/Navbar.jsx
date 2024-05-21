import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { GiLipstick } from "react-icons/gi";
import axios from 'axios';

const Navbar = () => {
    const [menu, setMenu] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        const fetchActiveStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/findActive');
                if (response.data) {
                    setIsLogged(true);
                } else {
                    setIsLogged(false);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/currentLoggedUser');
                if (response.data) {
                    setUserId(response.data.userId);
                    console.log(userId);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchActiveStatus();
        fetchCurrentUser();
    }, []);

    return (
        <div className="navbar">
            <div className="nav-logo">
                <a href="/">
                    <GiLipstick size={80} className="nav-icon" />
                </a>
                <p> BeautySphere: Makeup Product Recommendations </p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("home") }}><a href="/">Home</a> {menu === "home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("about") }}><a href="/about">About us</a>{menu === "about" ? <hr /> : <></>}</li>
                <li className="dropdown" onClick={() => { setMenu("categories") }}>
                    <Link to='/categories'>Categories</Link> {menu === "categories" ? <hr /> : <></>}
                    <div className="dropdown-content">
                        <a href="/categories/primer">Primer</a>
                        <a href="/categories/foundation">Foundation</a>
                        <a href="/categories/concealer">Concealer</a>
                        <a href="/categories/powder">Powder</a>
                        <a href="/categories/contour">Contour</a>
                        <a href="/categories/highlighter">Highlighter</a>
                        <a href="/categories/eyebrows">Eyebrows</a>
                        <a href="/categories/eyeshadow">Eyeshadow</a>
                        <a href="/categories/mascara">Mascara</a>
                        <a href="/categories/lips">Lips</a>
                    </div>
                </li>
            </ul>
            <div className="nav-cart-login-register">
                {isLogged ? (
                    <button><Link to={`/user/profile/${userId}`}>Profile</Link></button>
                ) : (
                    <>
                        <Link to='/login'><button>Login</button></Link>
                        <Link to='/register'><button>Register</button></Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
