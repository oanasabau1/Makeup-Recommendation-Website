package com.software_design.project_software_design.service;

import com.software_design.project_software_design.model.Review;
import com.software_design.project_software_design.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviewsByProductId(Long productId) {
        return reviewRepository.findAllByProductId(productId);
    }

    public Review saveReview(Review review) {
        review.setTimestamp(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    public Review getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId).orElse(null);
    }

    public List<Review> sortReviewsByTimestampAsc(Long productId) {
        return reviewRepository.findAllByProductIdOrderByTimestampAsc(productId);
    }

    public List<Review> sortReviewsByTimestampDesc(Long productId) {
        return reviewRepository.findAllByProductIdOrderByTimestampDesc(productId);
    }

    public List<Review> sortReviewsByRatingAsc(Long productId) {
        return reviewRepository.findAllByProductIdOrderByRatingAsc(productId);
    }

    public List<Review> sortReviewsByRatingDesc(Long productId) {
        return reviewRepository.findAllByProductIdOrderByRatingDesc(productId);
    }

    public Review updateReview(Review review) {
        Review existingReview = reviewRepository.findById(review.getReviewId()).orElse(null);
        if (existingReview != null) {
            existingReview.setComment(review.getComment());
            existingReview.setRating(review.getRating());
            existingReview.setTimestamp(LocalDateTime.now());
            return reviewRepository.save(existingReview);
        } else {
            return null;
        }
    }

    public String deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElse(null);
        if (review == null) {
            return "The review cannot be found";
        } else {
            reviewRepository.deleteById(reviewId);
            return "The review with the id " + reviewId + " was deleted successfully!";
        }
    }
}