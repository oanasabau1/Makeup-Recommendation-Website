import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Category from './pages/category/Category';
import Product from './pages/product/Product';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProductsPage from './pages/productsPage/ProductsPage';
import CategoryPage from './pages/categoryPage/CategoryPage';
import UserPage from './pages/userPage/UserPage';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
import AdminPage from './pages/adminPage/AdminPage';
import AddProduct from './pages/addProduct/AddProduct';
import UpdateProduct from './pages/updateProduct/UpdateProduct';
import ReviewPage from './pages/reviewPage/ReviewPage';
import ReviewOnePage from './pages/reviewOnePage/ReviewOnePage';
import BrandPage from './pages/brandPage/BrandPage';
import AddReview from './pages/addReview/AddReview';
import UpdateReview from './pages/updateReview/UpdateReview';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/categories'> 
            <Route index element={<CategoryPage />} />  
            <Route path=':categoryName' element={<Category />} />  
          </Route>
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/allProducts' element={<ProductsPage />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/product/update/:productId' element={<UpdateProduct />} />
          <Route path='/user/profile/:userId' element={<UserPage />} />
          <Route path='/user/update/:userId' element={<UpdateProfile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/product/:productId/addReview' element={<AddReview />} />
          <Route path='/product/:productId/reviews' element={<ReviewPage />} />
          <Route path='/product/:productId/review/:reviewId' element={<ReviewOnePage />} />
          <Route path='/product/:productId/review/:reviewId/update' element={<UpdateReview />} />
          <Route path='/products/:brand' element={<BrandPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
