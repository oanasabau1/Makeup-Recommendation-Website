import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'; 

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to BeautySphere - your new safe space</h1>
        <p>From cult classics to hidden gems, find your perfect match with trusted reviews from our vibrant community of makeup aficionados.</p>
        <Link to="/allProducts">
          <button>Explore</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
