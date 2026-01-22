import React from 'react';
import { motion } from 'framer-motion';
import '../Styles/SkeletonLoader.css';

export const SkeletonCard = () => (
  <motion.div
    className="skeleton-card"
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-subtitle"></div>
    <div className="skeleton-price"></div>
    <div className="skeleton-button"></div>
  </motion.div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonProductDetail = () => (
  <div className="skeleton-detail">
    <motion.div
      className="skeleton-image-large"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    ></motion.div>
    <div className="skeleton-info">
      <motion.div
        className="skeleton-title"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="skeleton-text"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="skeleton-button-large"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
    </div>
  </div>
);
