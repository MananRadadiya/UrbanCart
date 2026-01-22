import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../Components/CartContext";
import { AuthContext } from "../Components/AuthContext";
import "../Styles/Checkout.css";

function Checkout() {
  const { cart, totalAmount, clearCart } = useContext(CartContext);
  const { isAuthenticated, addOrder } = useContext(AuthContext);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="empty-checkout">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>Your cart is empty</h2>
          <p>Add items before proceeding to checkout</p>
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

  if (!isAuthenticated) {
    return (
      <div className="empty-checkout">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>Please sign in to checkout</h2>
          <p>You need to be logged in to complete your purchase</p>
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Valid 10-digit phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.match(/^\d{6}$/))
      newErrors.pincode = "Valid 6-digit pincode is required";
    if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
    if (!formData.cardNumber.match(/^\d{16}$/))
      newErrors.cardNumber = "Valid 16-digit card number is required";
    if (!formData.expiry.match(/^\d{2}\/\d{2}$/))
      newErrors.expiry = "Format: MM/YY";
    if (!formData.cvv.match(/^\d{3}$/))
      newErrors.cvv = "Valid 3-digit CVV is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const order = {
        id: Math.random(),
        date: new Date().toLocaleDateString(),
        total: (totalAmount * 1.18).toFixed(0),
        items: cart,
        shipping: formData,
      };

      addOrder(order);
      clearCart();
      setLoading(false);
      navigate("/success");
    }, 1000);
  };

  const tax = (totalAmount * 0.18).toFixed(0);
  const finalTotal = (totalAmount * 1.18).toFixed(0);

  return (
    <div className="checkout-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Checkout
      </motion.h1>

      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <motion.div
            className="form-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2>Shipping Address</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                {errors.fullName && <span className="error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                />
                {errors.state && <span className="error">{errors.state}</span>}
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="110001"
                />
                {errors.pincode && <span className="error">{errors.pincode}</span>}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="form-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2>Payment Details</h2>

            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="John Doe"
              />
              {errors.cardName && <span className="error">{errors.cardName}</span>}
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                />
                {errors.expiry && <span className="error">{errors.expiry}</span>}
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
            </div>

            <motion.button
              type="submit"
              className="place-order-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Processing..." : `Place Order ₹${finalTotal}`}
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          className="order-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <img src={item.thumbnail} alt={item.title} />
                  <div>
                    <p className="item-title">{item.title}</p>
                    <p className="item-qty">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="item-price">₹{(item.price * 80 * item.qty).toFixed(0)}</p>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(0)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="summary-row shipping">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Checkout;
