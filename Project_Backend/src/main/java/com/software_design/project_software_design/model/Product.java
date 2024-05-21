package com.software_design.project_software_design.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="productId", unique = true, nullable = false)
    private Long productId;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="brand", nullable = false)
    private String brand;

    @ManyToOne
    @JoinColumn(name="categoryId", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name="userId", nullable = false)
    private User user;

    @Column(name="image", nullable = false)
    private String imageUrl;

}
