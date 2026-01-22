import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById } from '../Services/ProductService';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import '../Styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const result = await getProductById(id);
      if (result.success) {
        setProduct(result.product);
        setInWishlist(isInWishlist(result.product.id));
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, isInWishlist]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      setQuantity(1);
    }
  };

  const handleWishlist = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
      setInWishlist(!inWishlist);
    }
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="skeleton-loader">
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <button onClick={() => navigate('/shop')}>Back to Shop</button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.thumbnail || '/placeholder.jpg'];
  const rating = product.rating || 0;
  const reviews = product.reviews ? product.reviews.length : 0;

  return (
    <div className="product-details-page">
      <motion.div
        className="breadcrumb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span onClick={() => navigate('/')}>Home</span>
        <span>/</span>
        <span onClick={() => navigate('/shop')}>Shop</span>
        <span>/</span>
        <span className="active">{product.title}</span>
      </motion.div>

      <motion.div
        className="details-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="product-gallery">
          <motion.div
            className="main-image"
            key={imageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={images[imageIndex]} alt={product.title} />
          </motion.div>

          {images.length > 1 && (
            <div className="gallery-thumbnails">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`thumbnail ${imageIndex === idx ? 'active' : ''}`}
                  onClick={() => setImageIndex(idx)}
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={img} alt={`${product.title} ${idx}`} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {product.title}
          </motion.h1>

          <motion.div
            className="rating-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>
                  ★
                </span>
              ))}
              <span className="rating-value">({rating.toFixed(1)})</span>
            </div>
            <span className="reviews-count">{reviews} Reviews</span>
          </motion.div>

          <motion.div
            className="price-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="price">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">${product.originalPrice}</span>
                  <span className="discount">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            {product.stock > 0 ? (
              <span className="stock in-stock">In Stock ({product.stock} available)</span>
            ) : (
              <span className="stock out-of-stock">Out of Stock</span>
            )}
          </motion.div>

          <motion.p
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {product.description}
          </motion.p>

          {product.brand && (
            <motion.div
              className="product-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="meta-label">Brand:</span>
              <span className="meta-value">{product.brand}</span>
            </motion.div>
          )}

          {product.category && (
            <motion.div
              className="product-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </motion.div>
          )}

          <motion.div
            className="quantity-selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label>Quantity:</label>
            <div className="qty-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
              >
                −
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </motion.div>

          <motion.div
            className="action-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              🛒 Add to Cart
            </button>
            <motion.button
              className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
              onClick={handleWishlist}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {inWishlist ? '❤️' : '🤍'} Wishlist
            </motion.button>
          </motion.div>

          <motion.div
            className="shipping-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="info-item">
              <span className="icon">🚚</span>
              <span>Free Shipping on orders over $50</span>
            </div>
            <div className="info-item">
              <span className="icon">🔄</span>
              <span>Easy Returns within 30 days</span>
            </div>
            <div className="info-item">
              <span className="icon">✓</span>
              <span>100% Authentic Products</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
