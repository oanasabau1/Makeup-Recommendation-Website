package com.software_design.project_software_design.controller;

import com.software_design.project_software_design.model.Category;
import com.software_design.project_software_design.service.CategoryService;
import com.software_design.project_software_design.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private UserService userService;

    @PostMapping("/addCategory")
    public ResponseEntity<String> addCategory(@RequestBody Category category) {
        if (userService.isAdminLogged()) {
            try {
                categoryService.saveCategory(category);
                return ResponseEntity.ok("Category saved successfully!");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only admins can add categories.");
        }
    }

    @PostMapping("/addCategories")
    public ResponseEntity<String> addCategories(@RequestBody List<Category> categories) {
        if (userService.isAdminLogged()) {
            try {
                categoryService.saveAllCategories(categories);
                return ResponseEntity.ok("Categories saved successfully!");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only admins can add categories.");
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return !categories.isEmpty() ? ResponseEntity.ok(categories) : ResponseEntity.noContent().build();
    }
}
