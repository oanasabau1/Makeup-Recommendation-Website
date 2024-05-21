import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('An error occurred while fetching categories.');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-page">
      <div className="category-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          categories.length > 0 ? (
            <ul className="category-list">
              {categories.map(category => (
                <li key={category.categoryId} className="category-item">
                  <Link to={`/categories/${category.categoryName.toLowerCase()}`} className="category-link">
                    {category.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No categories found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
