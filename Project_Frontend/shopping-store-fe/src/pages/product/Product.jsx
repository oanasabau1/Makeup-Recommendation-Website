import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css'; // Import CSS file
import { useParams, Link, useNavigate } from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:8080/product/${productId}`);
        setProduct(productResponse.data);
        const userResponse = await axios.get('http://localhost:8080/currentLoggedUser');
        if (userResponse.status === 200) {
          setIsAdmin(userResponse.data.userRole === "ADMIN");
        } else {
          console.error('Error fetching user data:', userResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productId]);

  const handleSeeReviews = () => {
    return <Link to={`/product/${productId}/reviews`}>See Reviews</Link>;
  };
  
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/product/delete/${productId}`);
      console.log("Product deleted successfully!");
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!product) {
    return <div className="no-product">No Product Found :(</div>;
  }

  return (
    <div className="product-container">
      <h1>{product.name}</h1>
      <div className="product-details">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-details-text">
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category.categoryName}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <button>
            <Link to={`/product/${productId}/reviews`} className="link-button">
              See Reviews
            </Link>
          </button>
          {isAdmin && (
            <>
              <button>
                <Link to={`/product/update/${productId}`} className="link-button">
                  Update Product
                </Link>
              </button>
              <button onClick={() => setShowConfirmation(true)}>Delete Product</button>
            </>
          )}
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-form">
          <p>Are you sure you want to delete this product?</p>
          <button onClick={handleDeleteProduct}>Yes, Delete</button>
          <button onClick={() => setShowConfirmation(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Product;
