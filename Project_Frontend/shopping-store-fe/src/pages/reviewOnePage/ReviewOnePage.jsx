import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import './ReviewOnePage.css'; 

const ReviewOnePage = () => {
  const { productId, reviewId } = useParams(); 
  const [review, setReview] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/currentLoggedUser');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching the current logged user:', error);
        setCurrentUser(null); 
      }
    };

    fetchReview();
    fetchCurrentUser();
  }, [productId, reviewId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="star">
          <FaStar className="star-icon" style={{ color: i <= rating ? 'yellow' : 'lightgray' }} />
        </span>
      );
    }
    return stars;
  };

  const handleUpdate = () => {
    navigate(`/product/${productId}/review/${reviewId}/update`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/product/${productId}/review/${reviewId}/delete`);
      navigate(`/product/${productId}/reviews`);
    } catch (error) {
      console.error('Error deleting the review:', error);
      setError('An error occurred while deleting the review.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div className="review-page">
      <h1>Review Details</h1>
      <div className="review-card">
        <h2>{review.user.firstName} {review.user.lastName}'s Review</h2>
        <div className="star-rating">
          {renderStars(review.rating)}
        </div>
        <p></p>
        <p><strong>{review.comment}</strong></p>
        <p><italic>{review.timestamp}</italic></p>
        {(currentUser && currentUser.userId === review.user.userId) && (
          <div className="button-group">
            <button onClick={handleUpdate} className="update-button">Update</button>
            <button onClick={() => setShowDeleteConfirmation(true)} className="delete-button">Delete</button>
          </div>
        )}
      </div>
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this review?</p>
          <button onClick={handleDelete} className="confirm-delete-button">Yes, Delete</button>
          <button onClick={() => setShowDeleteConfirmation(false)} className="cancel-delete-button">No, Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ReviewOnePage;
