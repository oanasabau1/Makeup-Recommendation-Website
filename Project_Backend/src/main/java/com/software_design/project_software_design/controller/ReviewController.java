package com.software_design.project_software_design.controller;

import com.software_design.project_software_design.model.Review;
import com.software_design.project_software_design.service.ReviewService;
import com.software_design.project_software_design.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;

    @PostMapping("/product/{productId}/addReview")
    public ResponseEntity<Review> saveReview(@PathVariable Long productId, @RequestBody Review review) {
        Long loggedInUserId = userService.findLoggedUser().getUserId();
        Long userId= review.getUser().getUserId();
        if (userService.isCurrentUserLogged(loggedInUserId) && loggedInUserId.equals(userId)) {
            Review savedReview = reviewService.saveReview(review);
            return ResponseEntity.ok(savedReview);
        } else {
            return ResponseEntity.badRequest().body(review);
        }
    }


    @GetMapping("/product/{productId}/review/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long productId, @PathVariable Long reviewId) {
        Review review = reviewService.getReviewById(reviewId);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/product/{productId}/reviews")
    public ResponseEntity<List<Review>> getAllReviews(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getAllReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("product/{productId}/reviews/sort/timestamp/ascending")
    public List<Review> sortReviewsByTimestampAsc(@PathVariable Long productId) {
        return reviewService.sortReviewsByTimestampAsc(productId);
    }

    @GetMapping("product/{productId}/reviews/sort/timestamp/descending")
    public List<Review> sortReviewsByTimestampDesc(@PathVariable Long productId) {
        return reviewService.sortReviewsByTimestampDesc(productId);
    }

    @GetMapping("product/{productId}/reviews/sort/rating/ascending")
    public List<Review> sortReviewsAsc(@PathVariable Long productId) {
        return reviewService.sortReviewsByRatingAsc(productId);
    }

    @GetMapping("product/{productId}/reviews/sort/rating/descending")
    public List<Review> sortReviewsDesc(@PathVariable Long productId) {
        return reviewService.sortReviewsByRatingDesc(productId);
    }

    @PutMapping("/product/{productId}/review/{reviewId}/update")
    public ResponseEntity<String> updateReview(@PathVariable Long productId, @PathVariable Long reviewId, @RequestBody Review updatedReview) {
        Long loggedInUserId = userService.findLoggedUser().getUserId();
        Review existingReview = reviewService.getReviewById(reviewId);
        if (existingReview == null) {
            return ResponseEntity.notFound().build();
        }
        if (!existingReview.getUser().getUserId().equals(loggedInUserId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only the owner of the review can update it.");
        }
        updatedReview.setReviewId(reviewId);
        updatedReview.getProduct().setProductId(productId);

        Review savedReview = reviewService.updateReview(updatedReview);
        if (savedReview != null) {
            return ResponseEntity.ok("Review details updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/product/{productId}/review/{reviewId}/delete")
    public ResponseEntity<String> deleteReview(@PathVariable Long productId, @PathVariable Long reviewId) {
        Long loggedInUserId = userService.findLoggedUser().getUserId();
        Review existingReview = reviewService.getReviewById(reviewId);
        if (existingReview == null) {
            return ResponseEntity.notFound().build();
        }
        if (!existingReview.getUser().getUserId().equals(loggedInUserId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only the owner of the review can delete it.");
        }
        String message = reviewService.deleteReview(reviewId);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

}

