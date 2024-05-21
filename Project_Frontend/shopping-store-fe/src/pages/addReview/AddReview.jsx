import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddReview.css'; 

const AddReview = () => {
  const colors = {
    yellow: 'yellow',
    lightgray: 'lightgray',
  };

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState(null); 

  const stars = Array(5).fill(0);

  const { productId } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/currentLoggedUser');
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []); 

  const handleClick = value => {
    setCurrentValue(value);
  };

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/product/${productId}/addReview`, {
        rating: currentValue,
        comment: comment,
        user: {
          userId: userId,
        },
        product: { productId: productId },
      });
      console.log('Review submitted successfully:', response.data);
      navigate(`/product/${productId}/reviews`);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="add-review-container">
      <h2>Add a Review</h2>
      <div className="star-container">
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={(hoverValue || currentValue) > index ? colors.yellow : colors.lightgray}
            className="star-icon"
          />
        ))}
      </div>
      <textarea
        className="review-textarea"
        placeholder="What's your opinion about this makeup product? Please let us know."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button onClick={handleSubmit} className="submit-button">Add Review</button>
    </div>
  );
};

export default AddReview;
