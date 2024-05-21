import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [sortByBrand, setSortByBrand] = useState(''); 

  useEffect(() => {
    fetchAllProducts();
  }, []); 
  const fetchProductsByBrand = async (brand) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${brand}`);
      setProducts(response.data); 
    } catch (error) {
      console.error('Error fetching products by brand:', error);
    }
  };

  const handleSortByBrand = (event) => {
    const selectedBrand = event.target.value;
    setSortByBrand(selectedBrand);
    if (selectedBrand === '') {
      fetchAllProducts();
    } else {
      window.location.href = `/products/${selectedBrand}`;
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/allProducts');
      setProducts(response.data); 
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  const uniqueBrandNames = [...new Set(products.map(product => product.brand))];

  return (
    <div className="products-container">
      <div className="sort-by-brand">
        <label htmlFor="sort-by-brand">Sort By Brand:</label>
        <select id="sort-by-brand" value={sortByBrand} onChange={handleSortByBrand}>
          <option value="">All Brands</option>
          {uniqueBrandNames.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

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

export default ProductsPage;
