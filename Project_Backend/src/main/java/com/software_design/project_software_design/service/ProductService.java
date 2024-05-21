package com.software_design.project_software_design.service;

import com.software_design.project_software_design.factory.*;
import com.software_design.project_software_design.model.Product;
import com.software_design.project_software_design.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> saveAllProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }

    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductByName(String name) {
        return productRepository.findProductByName(name);
    }

    public List<Product> getProductsByCategoryName(String categoryName) {
        return productRepository.findProductsByCategoryName(categoryName);
    }

    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findProductsByBrand(brand);
    }

    public void saveProductsToFile(String format) {
        List<Product> products = getAllProducts();
        DocumentWriter documentWriter;
        DocumentFactory factory = null;
        switch (format) {
            case "csv" -> {
                factory = new CSVFactory();
            }
            case "json" -> {
                factory = new JSONFactory();
            }
            case "xml" -> {
                factory = new XMLFactory();
            }
            default -> {
                System.out.println("Not a valid format");
            }
        }
        if (factory != null) {
            documentWriter = factory.factoryMethod();
            documentWriter.writeProductsFile(products);
        }
    }

    public Product updateProductDetails(Product product) {
        Product existingProduct=productRepository.findById(product.getProductId()).orElse(null);
        if (existingProduct!=null) {
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setBrand(product.getBrand());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setImageUrl(product.getImageUrl());
            return productRepository.save(existingProduct);
        }
        else {
            return null;
        }
    }

    public String deleteProduct(Long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            productRepository.deleteById(productId);
            return "Product with ID " + productId + " deleted successfully!";
        } else {
            return "Product with ID " + productId + " does not exist!";
        }
    }
}