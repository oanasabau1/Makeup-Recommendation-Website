import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import './UpdateReview.css'; // Create and import your CSS file

const UpdateReview = () => {
  const { productId, reviewId } = useParams(); // Get productId and reviewId from URL parameters
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${productId}/review/${reviewId}`);
        setReview(response.data);
      } catch (error) {
        console.error('Error fetching the review:', error);
        setError('An error occurred while fetching the review.');
      }
    };

    fetchReview();
  }, [productId, reviewId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleStarClick = (rating) => {
    setReview({ ...review, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/product/${productId}/review/${reviewId}/update`, review);
      navigate(`/product/${productId}/reviews`);
    } catch (error) {
      console.error('Error updating the review:', error);
      setError('An error occurred while updating the review.');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="star" onClick={() => handleStarClick(i)}>
          <FaStar className="star-icon" style={{ color: i <= rating ? 'yellow' : 'lightgray' }} />
        </span>
      );
    }
    return stars;
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-review-page">
      <h1>Update Review</h1>
      <form onSubmit={handleSubmit} className="update-review-form">
        <div className="form-group">
          <label>Rating:</label>
          <div className="star-rating">
            {renderStars(review.rating)}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={review.comment}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Review</button>
      </form>
    </div>
  );
};

export default UpdateReview;
