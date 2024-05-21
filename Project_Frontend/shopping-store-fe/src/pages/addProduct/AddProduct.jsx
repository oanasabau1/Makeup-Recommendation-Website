import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState(1); // Predefined as admin ID in this case 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      brand,
      category: { categoryId: Number(categoryId) },
      user: { userId: Number(userId) },
      imageUrl
    };

    console.log('Sending product data:', productData);

    try {
      const response = await axios.post('http://localhost:8080/addProduct', productData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Product added successfully!');
        navigate('/');
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
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
        <button type="submit">Add product</button>
      </form>
    </div>
  );
};

export default AddProduct;
