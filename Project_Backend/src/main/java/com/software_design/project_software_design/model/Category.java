package com.software_design.project_software_design.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="categoryId", unique = true, nullable = false)
    private Long categoryId;

    @Column(name="categoryName", unique = true, nullable = false)
    private String categoryName;

}
