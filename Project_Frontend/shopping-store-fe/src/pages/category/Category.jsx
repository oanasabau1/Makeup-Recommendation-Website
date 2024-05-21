import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Category.css';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/categories/${categoryName}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setError('An error occurred while fetching category products.');
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="products-container">
      <div className="products-grid">
        {products.map(product => (
          <Link to={`/product/${product.productId}`} key={product.productId} className="product-link">
            <div className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-details">
                <h3>{product.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
