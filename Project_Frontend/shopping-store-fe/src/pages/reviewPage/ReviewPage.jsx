import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ReviewPage.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const { productId } = useParams();
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let response;
        if (sortBy === 'date-asc') {
          response = await axios.get(`http://localhost:8080/product/${productId}/reviews/sort/timestamp/ascending`);
        } else if (sortBy === 'date-desc') {
          response = await axios.get(`http://localhost:8080/product/${productId}/reviews/sort/timestamp/descending`);
        } else if (sortBy === 'rating-asc') {
          response = await axios.get(`http://localhost:8080/product/${productId}/reviews/sort/rating/ascending`);
        } else {
          response = await axios.get(`http://localhost:8080/product/${productId}/reviews/sort/rating/descending`);
        }
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchActiveStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/findActive');
        setIsLogged(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReviews();
    fetchActiveStatus();
  }, [productId, sortBy]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="star">
            <FaStar className="star-icon" style={{ color: 'yellow' }} />
          </span>
        );
      } else if (rating < 5) {
        stars.push(
          <span key={i} className="star">
            <FaStar className="star-icon" style={{ color: 'lightgray' }} />
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            <FaStar className="star-icon" />
          </span>
        );
      }
    }
    return stars;
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleAddReview = () => {
    navigate(`/product/${productId}/addReview`);
  };

  return (
    <div className="review-page" style={{ fontFamily: 'Poppins' }}>
      <div className="sorting-dropdown">
        <label htmlFor="sort-select">Sort By:</label>
        <select id="sort-select" value={sortBy} onChange={handleSortChange}>
          <option value="rating-asc">Rating - Lowest to Highest</option>
          <option value="rating-desc">Rating - Highest to Lowest</option>
          <option value="date-asc">Date - Oldest to Newest</option>
          <option value="date-desc">Date - Newest to Oldest</option>
        </select>
      </div>
      <h1 className="page-title">Reviews</h1>
      {isLogged && (
        <button onClick={handleAddReview} className="add-review-button">
          Add Review
        </button>
      )}
      <div className="review-container">
        {reviews.map((review) => (
          <div key={review.reviewId} className="review-item">
            <div className="review-header">
              <p className="user-name">{review.user.firstName} {review.user.lastName}</p>
              <div className="star-rating">{renderStars(review.rating)}</div>
            </div>
            <Link to={`/product/${productId}/review/${review.reviewId}`} className="review-link">
              <p className="review-comment">{review.comment}</p>
            </Link>
            <p className="review-date">Date: {review.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
