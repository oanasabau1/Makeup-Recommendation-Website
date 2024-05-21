package com.software_design.project_software_design.repository;

import com.software_design.project_software_design.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.product.productId = :productId")
    List<Review> findAllByProductId(Long productId);

    @Query("SELECT r FROM Review r WHERE r.product.productId = :productId ORDER BY r.timestamp ASC")
    List<Review> findAllByProductIdOrderByTimestampAsc(Long productId);

    @Query("SELECT r FROM Review r WHERE r.product.productId = :productId ORDER BY r.timestamp DESC")
    List<Review> findAllByProductIdOrderByTimestampDesc(Long productId);

    @Query("SELECT r FROM Review r WHERE r.product.productId = :productId ORDER BY r.rating ASC, r.timestamp DESC")
    List<Review> findAllByProductIdOrderByRatingAsc(Long productId);

    @Query("SELECT r FROM Review r WHERE r.product.productId = :productId ORDER BY r.rating DESC, r.timestamp DESC")
    List<Review> findAllByProductIdOrderByRatingDesc(Long productId);

}
