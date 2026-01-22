import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "./WishlistContext";
import { CartContext } from "./CartContext";
import "../Styles/Wishlist.css";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <motion.div
          className="empty-wishlist"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="empty-icon">❤️</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite items to view them later</p>
          <motion.button
            onClick={() => navigate("/shop")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Wishlist
      </motion.h1>

      <motion.div
        className="wishlist-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence>
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              className="wishlist-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="wishlist-image">
                <img src={product.thumbnail} alt={product.title} />
                <motion.button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(product.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Remove from wishlist"
                >
                  ✕
                </motion.button>
              </div>

              <div className="wishlist-info">
                <h3>{product.title}</h3>
                <p className="price">₹ {(product.price * 80).toFixed(0)}</p>
                <div className="rating">
                  <span>⭐ {product.rating || 4.5}</span>
                </div>

                <motion.button
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🛒 Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Wishlist;
