import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import { AuthContext } from './AuthContext';
import '../Styles/Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/shop', label: 'Shop' },
    { path: '/men', label: 'Men' },
    { path: '/women', label: 'Women' },
    { path: '/accessories', label: 'Accessories' },
    { path: '/blog', label: 'Blog' },
  ];

  // Close menus when route changes
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* 1. BRAND LOGO */}
          <Link to="/" className="brand">
            <div className="brand-logo-box">UC</div>
            <span className="brand-text">URBAN CART</span>
          </Link>

          {/* 2. DESKTOP LINKS */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div layoutId="underline" className="active-line" />
                )}
              </Link>
            ))}
          </div>

          {/* 3. ACTIONS */}
          <div className="navbar-actions">
            
            {/* Search Bar */}
            <div className={`search-wrapper ${searchOpen ? 'open' : ''}`}>
               <form onSubmit={handleSearch}>
                 <FiSearch className="search-icon-static" onClick={() => setSearchOpen(true)} />
                 <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => !searchQuery && setSearchOpen(false)}
                    autoFocus={searchOpen}
                 />
                 {searchOpen && (
                   <FiX className="search-close" onClick={() => setSearchOpen(false)} />
                 )}
               </form>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="action-btn">
              <FiHeart size={20} />
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="badge"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="action-btn">
              <FiShoppingCart size={24} />
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="badge cart-badge"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* User Profile */}
            <div className="user-container">
              {isAuthenticated ? (
                <div className="user-dropdown-wrapper">
                  <button className="user-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    <FiUser size={24} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div 
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      >
                        <div className="dropdown-header">Hello, {user?.name?.split(' ')[0]}</div>
                        <Link to="/profile" className="dropdown-item">Profile</Link>
                        <Link to="/orders" className="dropdown-item">Orders</Link>
                        <button onClick={logout} className="dropdown-item danger">
                          <FiLogOut /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="login-pill">Login</Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="mobile-toggle" onClick={() => setMenuOpen(true)}>
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              className="mobile-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div 
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="mobile-header">
                <span className="brand-text">MENU</span>
                <button className="close-btn" onClick={() => setMenuOpen(false)}>
                  <FiX size={24} />
                </button>
              </div>

              <div className="mobile-links">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={link.path} className="mobile-link">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {!isAuthenticated && (
                <Link to="/login" className="mobile-login-btn">Login / Sign Up</Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;