package com.software_design.project_software_design.repository;

import com.software_design.project_software_design.model.Category;
import com.software_design.project_software_design.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findProductByName(String name);
    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.categoryName = :categoryName")
    List<Product> findProductsByCategoryName(String categoryName);

    List<Product> findProductsByBrand(String brand);

}
