import { motion } from "framer-motion";
import { useState } from "react";
import "../Styles/Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const footerSections = [
    {
      title: "Shop",
      links: ["Men", "Women", "Unisex", "Accessories", "New Arrivals"],
    },
    {
      title: "Help",
      links: ["Contact Us", "Shipping Info", "Returns", "FAQ", "Size Guide"],
    },
    {
      title: "Company",
      links: ["About Us", "Blog", "Careers", "Press", "Sustainability"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <motion.div
          className="newsletter-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="newsletter-content">
            <h2>Join Our Community</h2>
            <p>Get exclusive deals, new arrivals, and fashion tips delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
            {subscribed && (
              <motion.p
                className="success-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✓ Thanks for subscribing!
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Main Footer Links */}
        <motion.div
          className="footer-links-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {footerSections.map((section, idx) => (
            <motion.div key={idx} className="footer-section" variants={itemVariants}>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, linkIdx) => (
                  <motion.li key={linkIdx} whileHover={{ x: 5 }}>
                    <a href="/">{link}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Social & Brand Section */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="footer-brand">
            <h3 className="footer-logo">URBAN CART</h3>
            <p>Premium streetwear for modern life. Designed for comfort. Built for style.</p>
          </div>

          <div className="social-links">
            <h4>Follow Us</h4>
            <div className="social-icons">
              {["Instagram", "Facebook", "Twitter", "TikTok"].map((social) => (
                <motion.a
                  key={social}
                  href="/"
                  className="social-icon"
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  title={social}
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="payment-methods">
            <h4>Secure Payment</h4>
            <div className="payment-icons">
              {["💳", "🏦", "📱", "₹"].map((icon, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring" }}
                >
                  {icon}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="footer-copyright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 URBAN CART. All rights reserved. | Designed with 💛 for street style lovers</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
