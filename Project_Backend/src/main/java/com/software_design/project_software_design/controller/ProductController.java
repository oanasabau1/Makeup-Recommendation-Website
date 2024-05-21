package com.software_design.project_software_design.controller;

import com.software_design.project_software_design.model.Product;
import com.software_design.project_software_design.model.User;
import com.software_design.project_software_design.service.CategoryService;
import com.software_design.project_software_design.service.EmailService;
import com.software_design.project_software_design.service.ProductService;
import com.software_design.project_software_design.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/addProduct")
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        if (userService.isAdminLogged()) {
            try {
                productService.saveProduct(product);
                String subject="BeautySphere - Don't miss out the hottest and newest makeup product on the market!";
                List<User> users=userService.getUsers();
                for (User user:users) {
                    String message = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n\n"
                            + "A new makeup product was added to the blog: " + product.getName() + " by " + product.getBrand() + ". "
                            + "Please be the first one to try it and review it, so your opinion matters!\n\n\n\n"
                            + "With love, \nOana Sabau from BeautySphere";
                    emailService.sendEmail(user.getEmail(), subject, message);
                }
                return ResponseEntity.ok("Product added successfully!");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product.");
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only admins can add products.");
        }
    }

    @PostMapping("/addProducts")
    public ResponseEntity<String> addProducts(@RequestBody List<Product> products) {
        if (userService.isAdminLogged()) {
            try {
                productService.saveAllProducts(products);
                return ResponseEntity.ok("Products added successfully!");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add products.");
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only admins can add products.");
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Product> getProductByIdentifier(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @GetMapping("/productByName/{name}")
    public ResponseEntity<Product> productByName(@PathVariable String name) {
        Product product = productService.getProductByName(name);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @GetMapping("/allProducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return !products.isEmpty() ? ResponseEntity.ok(products) : ResponseEntity.noContent().build();
    }

    @GetMapping("/categories/{categoryName}")
    public ResponseEntity<List<Product>> getProductsByCategoryName(@PathVariable String categoryName) {
        List<Product> products=productService.getProductsByCategoryName(categoryName);
        return !products.isEmpty() ? ResponseEntity.ok(products) : ResponseEntity.noContent().build();
    }

    @GetMapping("/products/{brand}")
    public ResponseEntity<List<Product>> getProductsByBrandName(@PathVariable String brand) {
        List<Product> products=productService.getProductsByBrand(brand);
        return !products.isEmpty() ? ResponseEntity.ok(products) : ResponseEntity.noContent().build();
    }

    @GetMapping("/saveProducts")
    public void saveProductsToFile(HttpServletRequest request, HttpServletResponse response, @RequestParam String format) throws IOException {
        if (userService.isAdminLogged()) {
            productService.saveProductsToFile(format);
            String EXTERNAL_FILE_PATH = "makeup_products." + format;
            File file = new File(EXTERNAL_FILE_PATH);
            if (file.exists()) {
                String mimeType = request.getServletContext().getMimeType(file.getAbsolutePath());
                if (mimeType == null) {
                    mimeType = "application/octet-stream";
                }
                response.setContentType(mimeType);
                response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
                response.setContentLength((int) file.length());

                try (InputStream inputStream = new BufferedInputStream(new FileInputStream(file))) {
                    FileCopyUtils.copy(inputStream, response.getOutputStream());
                } catch (IOException ex) {
                    throw new IOException("Error occurred while copying file to response output stream.", ex);
                }
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found");
            }
        }
    }

    @PutMapping("/product/update/{productId}")
    public ResponseEntity<String> updateProductDetails(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        if (userService.isAdminLogged()) {
            Product existingProduct = productService.getProductById(productId);
            if (existingProduct == null) {
                return ResponseEntity.notFound().build();
            }
            Product savedProduct = productService.updateProductDetails(updatedProduct);
            if (savedProduct != null) {
                return ResponseEntity.ok("Product details updated successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only admins can update products.");
        }
    }

    @DeleteMapping("/product/delete/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        if (userService.isAdminLogged()) {
            String message = productService.deleteProduct(productId);
            return ResponseEntity.ok(message);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only admins can delete products.");
        }
    }

}
