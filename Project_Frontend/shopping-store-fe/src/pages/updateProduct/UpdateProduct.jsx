import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import './UpdateProduct.css';

const UpdateProduct = () => {
  const { productId } = useParams(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState(1); // Predefined as admin ID
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const categories = [
    { categoryId: 1, categoryName: "Primer" },
    { categoryId: 2, categoryName: "Foundation" },
    { categoryId: 3, categoryName: "Concealer" },
    { categoryId: 4, categoryName: "Powder" },
    { categoryId: 5, categoryName: "Contour" },
    { categoryId: 6, categoryName: "Highlighter" },
    { categoryId: 7, categoryName: "Eyebrows" },
    { categoryId: 8, categoryName: "Eyeshadow" },
    { categoryId: 9, categoryName: "Mascara" },
    { categoryId: 10, categoryName: "Lips" }
  ];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${productId}`);
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setBrand(product.brand);
        setCategoryId(product.category.categoryId);
        setImageUrl(product.imageUrl);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      productId,
      name,
      description,
      brand,
      category: { categoryId: Number(categoryId) },
      user: { userId: Number(userId) },
      imageUrl
    };

    console.log('Sending product data:', productData);

    try {
      const response = await axios.put(`http://localhost:8080/product/update/${productId}`, productData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Product updated successfully!');
        navigate('/');
      } else {
        alert('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An error occurred while updating the product.');
    }
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
