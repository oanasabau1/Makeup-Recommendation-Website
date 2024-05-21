import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './BrandPage.css';

const BrandPage = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsByBrand();
  }, [brand]);

  const fetchProductsByBrand = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${brand}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by brand:', error);
    }
  };

  return (
    <div className="brand-page">
      <h1>Products from {brand}</h1>
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

export default BrandPage;
