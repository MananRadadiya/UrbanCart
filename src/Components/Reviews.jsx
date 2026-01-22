import { motion } from "framer-motion";
import { useState } from "react";
import "../Styles/Reviews.css";

function Reviews() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    title: "",
    comment: "",
  });

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

  const allReviews = [
    {
      id: 1,
      name: "James Wilson",
      rating: 5,
      title: "Absolutely Perfect!",
      comment: "The quality exceeded my expectations. The fit is perfect and the material feels premium. Will definitely buy again!",
      verified: true,
      helpful: 124,
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 5,
      title: "Love the Style",
      comment: "Great collection with unique designs. Fast delivery and excellent customer service. Highly recommended!",
      verified: true,
      helpful: 98,
    },
    {
      id: 3,
      name: "Marcus Johnson",
      rating: 4,
      title: "Great Quality, Worth It",
      comment: "Really happy with my purchase. The streetwear collection is on point. Only wish there were more color options.",
      verified: true,
      helpful: 76,
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      rating: 5,
      title: "Best Purchase Ever",
      comment: "The attention to detail is incredible. Every piece looks and feels premium. Customer support is super helpful too!",
      verified: true,
      helpful: 156,
    },
    {
      id: 5,
      name: "Rahul Desai",
      rating: 5,
      title: "Transformed My Wardrobe",
      comment: "Found exactly what I was looking for. The prices are fair and the quality is outstanding. Highly satisfied!",
      verified: true,
      helpful: 132,
    },
    {
      id: 6,
      name: "Sophie Martin",
      rating: 4,
      title: "Very Satisfied",
      comment: "Good quality and great prices. The only downside was slightly long delivery time, but everything else was perfect.",
      verified: true,
      helpful: 89,
    },
  ];

  const filteredReviews = selectedRating 
    ? allReviews.filter(review => review.rating === selectedRating)
    : allReviews;

  const averageRating = (
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
  ).toFixed(1);

  const ratingCounts = {
    5: allReviews.filter(r => r.rating === 5).length,
    4: allReviews.filter(r => r.rating === 4).length,
    3: allReviews.filter(r => r.rating === 3).length,
    2: allReviews.filter(r => r.rating === 2).length,
    1: allReviews.filter(r => r.rating === 1).length,
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    alert(`Thank you for your review, ${newReview.name}! We appreciate your feedback.`);
    setNewReview({ name: "", rating: 5, title: "", comment: "" });
  };

  const StarRating = ({ rating, interactive = false, onChange = null }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.span
            key={star}
            className={`star ${star <= rating ? "filled" : ""}`}
            onClick={() => interactive && onChange && onChange(star)}
            whileHover={interactive ? { scale: 1.2 } : {}}
            style={{ cursor: interactive ? "pointer" : "default" }}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <div className="reviews-container">
      {/* Header */}
      <motion.section
        className="reviews-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }}>
          Customer Reviews & Ratings
        </motion.h1>
        <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
          See what our amazing customers think about URBAN CART
        </motion.p>
      </motion.section>

      {/* Rating Summary */}
      <section className="rating-summary">
        <motion.div
          className="summary-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="overall-rating">
            <div className="rating-number">{averageRating}</div>
            <StarRating rating={Math.round(averageRating)} />
            <p className="rating-text">Based on {allReviews.length} reviews</p>
          </div>

          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map((stars) => (
              <motion.div
                key={stars}
                className="rating-row"
                whileHover={{ x: 5 }}
                onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
              >
                <span className="rating-label">{stars} ⭐</span>
                <div className="rating-bar-container">
                  <motion.div
                    className="rating-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(ratingCounts[stars] / allReviews.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="rating-count">{ratingCounts[stars]}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Reviews List */}
      <section className="reviews-list">
        <div className="reviews-header-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {selectedRating ? `Reviews with ${selectedRating} ⭐` : "All Reviews"}
          </motion.h2>
          {selectedRating && (
            <motion.button
              className="clear-filter-btn"
              onClick={() => setSelectedRating(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filter
            </motion.button>
          )}
        </div>

        <motion.div
          className="reviews-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              className="review-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">{review.name[0]}</div>
                  <div>
                    <h3>{review.name}</h3>
                    {review.verified && <span className="verified-badge">✓ Verified Buyer</span>}
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <h4 className="review-title">{review.title}</h4>
              <p className="review-comment">{review.comment}</p>

              <div className="review-footer">
                <button className="helpful-btn">👍 Helpful ({review.helpful})</button>
                <span className="review-date">2 days ago</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Write Review Form */}
      <section className="write-review">
        <motion.div
          className="review-form-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Share Your Experience</h2>
          <p>Help other customers by sharing your honest review</p>

          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <StarRating
                rating={newReview.rating}
                interactive={true}
                onChange={(rating) => setNewReview({ ...newReview, rating })}
              />
            </div>

            <div className="form-group">
              <label>Review Title</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your detailed experience with URBAN CART..."
                rows="5"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="submit-review-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Review
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

export default Reviews;
