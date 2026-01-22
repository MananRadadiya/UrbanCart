import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import '../Styles/Card.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id));
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    addToCart(product);
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setInWishlist(!inWishlist);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const image = product.images?.[0] || product.thumbnail || '/placeholder.jpg';
  const discount = product.discountPercentage ? Math.round(product.discountPercentage) : 0;

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      onClick={handleViewDetails}
    >
      <div className="product-image-container">
        <motion.div
          className="product-image-wrapper"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          <img src={image} alt={product.title} loading="lazy" />
          {discount > 0 && (
            <motion.div
              className="discount-badge"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              -{discount}%
            </motion.div>
          )}
        </motion.div>

        <motion.button
          className={`wishlist-button ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {inWishlist ? '❤️' : '🤍'}
        </motion.button>

        <motion.div
          className="product-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Quick View
          </motion.button>
        </motion.div>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <div className="product-meta">
          {product.rating && (
            <div className="rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span className="rating-value">({product.rating.toFixed(1)})</span>
            </div>
          )}
        </div>

        <div className="product-price">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <motion.button
          className={`btn-add-cart ${isAddingToCart ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          whileHover={product.stock !== 0 ? { scale: 1.02 } : {}}
          whileTap={product.stock !== 0 ? { scale: 0.98 } : {}}
        >
          {isAddingToCart ? (
            <>
              <span className="checkmark">✓</span>
              <span>Added</span>
            </>
          ) : product.stock === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <span>🛒</span>
              <span>Add to Cart</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

