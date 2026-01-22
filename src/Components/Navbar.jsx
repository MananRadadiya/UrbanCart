import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    { path: '/unisex', label: 'Unisex' },
    { path: '/accessories', label: 'Accessories' },
    { path: '/blog', label: 'Blog' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* BRAND */}
        <motion.div
          className="navbar-brand"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/" className="brand-logo">
            <span className="brand-icon">𝐔𝐂</span>
            <span className="brand-text">URBAN CART</span>
          </Link>
        </motion.div>

        {/* LINKS */}
        <div className={`nav-links ${menuOpen ? 'mobile-active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="navbar-actions">
          {/* Animated Search Box */}
          <motion.div
            className={`search-box ${searchOpen ? 'active' : ''}`}
            initial={false}
            animate={{ width: searchOpen ? 260 : 40 }} // Adjusted width for better fit
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <form onSubmit={handleSearch}>
              <motion.input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => !searchQuery && setSearchOpen(false)}
                className="search-input"
                // Hide input visually when closed to prevent overlap
                style={{ opacity: searchOpen ? 1 : 0 }} 
              />
              <motion.button
                type="submit"
                className="search-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                // Keep button visible always
                onClick={() => !searchOpen && setSearchOpen(true)} 
              >
                🔍
              </motion.button>
            </form>
          </motion.div>

          <Link to="/wishlist" className="nav-icon-link">
            <span className="icon" title="Wishlist">❤️</span>
            <AnimatePresence>
              {wishlist.length > 0 && (
                <motion.span
                  className="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {wishlist.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link to="/cart" className="nav-icon-link">
            <span className="icon" title="Cart">🛒</span>
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span
                  className="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {isAuthenticated ? (
            <div className="user-menu-container">
              <button
                className="user-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                👤 <span>{user?.name?.split(' ')[0]}</span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className="user-dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Link to="/profile" className="dropdown-link">My Profile</Link>
                    <button
                      className="dropdown-link"
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      style={{ color: '#d32f2f' }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Sign In
            </Link>
          )}

          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;