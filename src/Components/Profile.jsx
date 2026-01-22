import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "../Styles/Profile.css";

function Profile() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <motion.div
          className="not-authenticated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="not-auth-content">
            <h2>Please sign in to view your profile</h2>
            <motion.button
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-header">
          <div className="profile-avatar">{user?.name?.charAt(0)}</div>
          <div className="profile-info">
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Account Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <p>{user?.name}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Order History</h2>
            {user?.orders && user.orders.length > 0 ? (
              <div className="orders-list">
                {user.orders.map((order, idx) => (
                  <motion.div
                    key={idx}
                    className="order-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="order-header">
                      <span className="order-id">Order #{idx + 1}</span>
                      <span className="order-status">Completed</span>
                    </div>
                    <p className="order-date">
                      {new Date().toLocaleDateString()}
                    </p>
                    <p className="order-amount">₹ {order.total}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="no-orders">
                <p>You haven't made any orders yet</p>
                <motion.button
                  onClick={() => navigate("/shop")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Shopping
                </motion.button>
              </div>
            )}
          </div>

          <div className="profile-section">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <motion.button
                className="action-btn"
                onClick={() => navigate("/wishlist")}
                whileHover={{ y: -5 }}
              >
                ❤️ Wishlist
              </motion.button>
              <motion.button
                className="action-btn"
                onClick={() => navigate("/shop")}
                whileHover={{ y: -5 }}
              >
                🛍️ Continue Shopping
              </motion.button>
              <motion.button
                className="action-btn logout"
                onClick={handleLogout}
                whileHover={{ y: -5 }}
              >
                🚪 Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
