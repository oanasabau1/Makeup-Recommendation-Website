package com.software_design.project_software_design.service;

import com.software_design.project_software_design.model.Category;
import com.software_design.project_software_design.model.Product;
import com.software_design.project_software_design.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> saveAllCategories(List<Category> categories) {
        return categoryRepository.saveAll(categories);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

}