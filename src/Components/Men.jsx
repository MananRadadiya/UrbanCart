import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { SkeletonGrid } from './SkeletonLoader';
import { useProductsByCategory } from '../Hooks';
import '../Styles/Products.css';

const Men = () => {
  // Use new category-aware hook for intelligent client-side filtering
  const { products, loading, error } = useProductsByCategory('men');

  return (
    <div className="products-page">
      <motion.div
        className="products-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Men's Collection</h1>
        <p>Premium styles designed for modern men</p>
      </motion.div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : error ? (
        <div className="empty-state error-state">
          <span className="empty-icon">⚠️</span>
          <h2>Unable to load products</h2>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">✨</span>
          <h2>Curating the collection</h2>
          <p>Premium men's styles coming soon</p>
          <a href="/shop" className="empty-cta">
            Explore All Products
          </a>
        </div>
      ) : (
        <motion.div
          className="products-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Men;

