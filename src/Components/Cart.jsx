import { useContext } from "react";
import { CartContext } from "../Components/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalAmount } =
    useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="empty-cart-content"
        >
          <div className="empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <motion.button
            className="continue-shopping-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/men")}
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Shopping Cart
      </motion.h1>

      <div className="cart-container">
        <div className="cart-items">
          <AnimatePresence>
            {cart.map((item, idx) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ backgroundColor: "rgba(255, 215, 0, 0.05)" }}
              >
                <motion.img
                  src={item.thumbnail}
                  alt={item.title}
                  whileHover={{ scale: 1.05 }}
                />

                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">₹ {item.price.toFixed(0)}</p>
                </div>

                <div className="quantity-control">
                  <motion.button
                    onClick={() => decreaseQty(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    −
                  </motion.button>
                  <span>{item.qty}</span>
                  <motion.button
                    onClick={() => increaseQty(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>

                <p className="item-total">
                  ₹ {(item.price * item.qty).toFixed(0)}
                </p>

                <motion.button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="cart-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹ {totalAmount.toFixed(0)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">FREE</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>₹ {(totalAmount * 0.18).toFixed(0)}</span>
          </div>

          <motion.div
            className="summary-total"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <span>Total</span>
            <span>₹ {(totalAmount * 1.18).toFixed(0)}</span>
          </motion.div>

          <motion.button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Checkout
          </motion.button>

          <motion.button
            className="continue-btn"
            onClick={() => navigate("/men")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>

          <div className="promo-section">
            <input type="text" placeholder="Enter promo code" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Cart;
