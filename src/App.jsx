import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AIChatbot from './Components/AIChatbot';
import Home from './Components/Home';
import Shop from './Components/Shop';
import SearchResults from './Components/SearchResults';
import Men from './Components/Men';
import Women from './Components/Women';
import Unisex from './Components/Unisex';
import Accessories from './Components/Accessories';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import OrderSuccess from './Components/OrderSuccess';
import About from './Components/About';
import Blog from './Components/Blog';
import Reviews from './Components/Reviews';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Wishlist from './Components/Wishlist';
import NotFound from './Components/NotFound';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/unisex" element={<Unisex />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <AIChatbot />
    </>
  );
}

export default App;


