import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const featuredProducts = [
    { id: 1, name: "Premium Streetwear Tee", price: "₹2,499", icon: "👕", color: "#ff6b6b" },
    { id: 2, name: "Denim Collection", price: "₹4,999", icon: "👖", color: "#4ecdc4" },
    { id: 3, name: "Accessories Pack", price: "₹1,999", icon: "🧢", color: "#ffd700" },
    { id: 4, name: "Shoes & Kicks", price: "₹5,999", icon: "👟", color: "#95e1d3" },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Products" },
    { number: "100%", label: "Satisfaction" },
    { number: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      text: "Amazing quality and style! URBAN CART is my go-to for streetwear.",
      rating: 5,
    },
    {
      name: "Mike Davis",
      role: "Style Blogger",
      text: "The collection is incredible. Fast shipping and great customer service!",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      role: "Professional",
      text: "Perfect balance of comfort and style. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants}>
            Modern Streetwear for Everyday Life
          </motion.h1>
          <motion.p variants={itemVariants}>
            Designed for comfort. Built for style. Engineered for confidence.
          </motion.p>
          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/men")}
            >
              Shop Now
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/about")}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="hero-shape"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            👔
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Collections
        </motion.h2>
        <motion.div
          className="featured-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={idx}
              className="featured-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="featured-icon"
                style={{ backgroundColor: product.color }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                {product.icon}
              </motion.div>
              <h3>{product.name}</h3>
              <p className="featured-price">{product.price}</p>
              <motion.button
                className="featured-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} className="stat-card" variants={itemVariants}>
              <motion.div
                className="stat-number"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="testimonial-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 initial={{ y: 20 }} whileInView={{ y: 0 }}>
            Ready to Upgrade Your Style?
          </motion.h2>
          <motion.p initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ delay: 0.1 }}>
            Join thousands of fashion-forward customers already loving URBAN CART
          </motion.p>
          <motion.button
            className="btn btn-primary btn-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/men")}
          >
            Start Shopping
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;

