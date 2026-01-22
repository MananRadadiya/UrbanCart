import { motion } from "framer-motion";
import { useState } from "react";
import "../Styles/Blog.css";

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const blogPosts = [
    {
      id: 1,
      title: "How to Style Streetwear for Every Season",
      category: "style",
      image: "👔",
      excerpt:
        "Master the art of layering and mixing pieces to create stunning streetwear looks all year round.",
      date: "Jan 15, 2025",
      author: "Sarah Chen",
      readTime: 5,
    },
    {
      id: 2,
      title: "The Ultimate Guide to Sustainable Fashion",
      category: "sustainability",
      image: "🌱",
      excerpt:
        "Learn how URBAN CART is committed to eco-friendly production and how you can shop sustainably.",
      date: "Jan 12, 2025",
      author: "Mike Davis",
      readTime: 8,
    },
    {
      id: 3,
      title: "Top 10 Streetwear Icons You Should Follow",
      category: "fashion",
      image: "⭐",
      excerpt:
        "Discover the biggest names in streetwear fashion and get inspired by their unique styles.",
      date: "Jan 10, 2025",
      author: "Emma Wilson",
      readTime: 6,
    },
    {
      id: 4,
      title: "Care Tips: How to Keep Your Streetwear Looking Fresh",
      category: "tips",
      image: "✨",
      excerpt:
        "Essential maintenance tips to extend the life of your URBAN CART collection and keep it pristine.",
      date: "Jan 8, 2025",
      author: "James Rodriguez",
      readTime: 4,
    },
    {
      id: 5,
      title: "Behind the Scenes: Our Design Process",
      category: "behind-scenes",
      image: "🎨",
      excerpt:
        "Get an exclusive look at how our talented design team creates the collections you love.",
      date: "Jan 5, 2025",
      author: "Lisa Park",
      readTime: 7,
    },
    {
      id: 6,
      title: "Affordable Luxury: Budget-Friendly Streetwear Hauls",
      category: "style",
      image: "💳",
      excerpt:
        "Create amazing outfits without breaking the bank. Here are our best budget-friendly picks.",
      date: "Jan 2, 2025",
      author: "Alex Turner",
      readTime: 5,
    },
  ];

  const categories = [
    { id: "all", label: "All Posts", icon: "📚" },
    { id: "style", label: "Style Tips", icon: "👕" },
    { id: "fashion", label: "Fashion News", icon: "🎯" },
    { id: "tips", label: "Care Tips", icon: "🧴" },
    { id: "sustainability", label: "Sustainability", icon: "🌍" },
    { id: "behind-scenes", label: "Behind the Scenes", icon: "📹" },
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="blog-container">
      {/* Header */}
      <motion.section
        className="blog-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }}>
          URBAN CART Blog
        </motion.h1>
        <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
          Fashion tips, style guides, and insider stories from the world of streetwear
        </motion.p>
      </motion.section>

      {/* Featured Post */}
      <section className="featured-post-section">
        <motion.div
          className="featured-post"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="featured-content">
            <motion.span className="featured-label" whileHover={{ scale: 1.05 }}>
              Featured Story
            </motion.span>
            <h2>The Art of Building Your Perfect Streetwear Wardrobe</h2>
            <p>
              Discover the essential pieces every streetwear enthusiast needs and how to mix and
              match them for endless outfit combinations.
            </p>
            <div className="featured-meta">
              <span>Jan 20, 2025</span>
              <span>•</span>
              <span>10 min read</span>
              <span>•</span>
              <span>By Sarah Chen</span>
            </div>
            <motion.button
              className="read-more-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read Full Story →
            </motion.button>
          </div>
          <motion.div
            className="featured-visual"
            whileHover={{ scale: 1.05 }}
          >
            👔
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <motion.div
          className="categories"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="category-icon">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts-section">
        <motion.div
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              className="blog-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="blog-card-image">
                <motion.div whileHover={{ scale: 1.1 }}>
                  {post.image}
                </motion.div>
              </div>

              <div className="blog-card-content">
                <motion.span className="blog-category" whileHover={{ scale: 1.1 }}>
                  {categories.find((c) => c.id === post.category)?.label}
                </motion.span>

                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                <div className="blog-meta">
                  <div className="blog-meta-left">
                    <span className="author">By {post.author}</span>
                    <span className="date">{post.date}</span>
                  </div>
                  <span className="read-time">{post.readTime} min</span>
                </div>

                <motion.button
                  className="blog-read-btn"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Article →
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter">
        <motion.div
          className="newsletter-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 initial={{ y: 20 }} whileInView={{ y: 0 }}>
            Get the Latest Fashion Tips & Stories
          </motion.h2>
          <motion.p initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ delay: 0.1 }}>
            Subscribe to our newsletter and never miss a beat in the world of streetwear
          </motion.p>

          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
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
        </motion.div>
      </section>
    </div>
  );
}

export default Blog;
