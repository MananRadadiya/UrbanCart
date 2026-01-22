import { motion } from "framer-motion";
import "../Styles/About.css";

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const values = [
    {
      icon: "⚡",
      title: "Quality First",
      description: "Every product is carefully selected and tested for excellence",
    },
    {
      icon: "🎨",
      title: "Style Innovation",
      description: "Staying ahead of trends with fresh, modern designs",
    },
    {
      icon: "💚",
      title: "Customer Care",
      description: "Your satisfaction is our top priority, 24/7 support available",
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "Committed to eco-friendly practices and ethical production",
    },
  ];

  const team = [
    { name: "Alex Rodriguez", role: "Founder & CEO", emoji: "👨‍💼" },
    { name: "Sarah Chen", role: "Design Director", emoji: "👩‍🎨" },
    { name: "Mike Thompson", role: "Operations Lead", emoji: "👨‍💻" },
    { name: "Emma Davis", role: "Customer Success", emoji: "👩‍💼" },
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <motion.div
          className="about-hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants}>About URBAN CART</motion.h1>
          <motion.p variants={itemVariants}>
            We're on a mission to make premium streetwear accessible to everyone,
            combining style, comfort, and sustainability in every piece.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <motion.div
          className="story-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="story-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Our Story</h2>
            <p>
              Founded in 2020, URBAN CART was born from a simple idea: everyone deserves access to
              high-quality, stylish streetwear without breaking the bank.
            </p>
            <p>
              What started as a small passion project in a garage has grown into a thriving
              community of fashion enthusiasts worldwide. Today, we serve thousands of customers
              daily, delivering premium products and exceptional service.
            </p>
            <p>
              Our journey has been about more than just selling clothes—it's about creating a
              lifestyle, building a community, and empowering people to express themselves through
              fashion.
            </p>
          </motion.div>
          <motion.div
            className="story-visual"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="story-emoji">📈</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Core Values
        </motion.h2>
        <motion.div
          className="values-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              className="value-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="value-icon"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {value.icon}
              </motion.div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>
        <motion.div
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="team-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="team-avatar"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {member.emoji}
              </motion.div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <motion.div
          className="stats-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: "50K+", label: "Customers" },
            { number: "1000+", label: "Products" },
            { number: "50+", label: "Countries" },
            { number: "99%", label: "Satisfaction" },
          ].map((stat, idx) => (
            <motion.div key={idx} className="about-stat" variants={itemVariants}>
              <motion.div className="about-stat-number">
                {stat.number}
              </motion.div>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <motion.div
          className="mission-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 initial={{ y: 20 }} whileInView={{ y: 0 }}>
            Our Mission
          </motion.h2>
          <motion.p initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ delay: 0.1 }}>
            To revolutionize the streetwear industry by making premium, sustainable fashion
            accessible to everyone. We believe that style shouldn't come at the expense of
            quality or ethics. Every URBAN CART piece tells a story of craftsmanship, innovation,
            and passion.
          </motion.p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <motion.div
          className="about-cta-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Join the URBAN CART Community</h2>
          <p>Experience the difference quality and style can make</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Shopping
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
