import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../Styles/NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <motion.div
        className="not-found-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="error-code"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </motion.p>

        <motion.div
          className="button-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-home"
          >
            Back to Home
          </motion.button>

          <motion.button
            onClick={() => navigate("/shop")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-shop"
          >
            Continue Shopping
          </motion.button>
        </motion.div>

        <motion.div
          className="error-visual"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔍
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;
