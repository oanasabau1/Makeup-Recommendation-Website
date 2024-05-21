package com.software_design.project_software_design.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reviewId", unique = true, nullable = false)
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name="productId", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name="userId", nullable = false)
    private User user;

    @Column(name="rating", nullable = false)
    private int rating;

    @Column(name="comment")
    private String comment;

    @Column(name="timestamp", nullable = false)
    private LocalDateTime timestamp;

    @PrePersist
    @PreUpdate
    private void validateRating() {
        if (rating < 0 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 0 and 5");
        }
    }
}
