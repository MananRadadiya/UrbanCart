import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { SkeletonGrid } from './SkeletonLoader';
import { useProductsByCategory } from '../Hooks';
import '../Styles/Shop.css';

const Shop = () => {
  // Fetch all products (no category filter)
  const { products, loading, error } = useProductsByCategory(null);
  
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000,
    rating: 0,
    sortBy: 'relevant',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized filtering logic - only recalculates when products, filters, or search changes
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    // Price and rating filters
    result = result.filter((p) => {
      const price = p.price || 0;
      const rating = p.rating || 0;
      return price >= filters.priceMin && 
             price <= filters.priceMax && 
             rating >= filters.rating;
    });

    // Sorting
    if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sortBy === 'newest') {
      result.reverse();
    }

    return result;
  }, [products, filters, searchTerm]);

  const handleResetFilters = () => {
    setFilters({ priceMin: 0, priceMax: 1000, rating: 0, sortBy: 'relevant' });
    setSearchTerm('');
  };

  return (
    <div className="shop-page">
      <motion.div
        className="shop-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Shop All Products</h1>
        <p>Discover our premium collection</p>
      </motion.div>

      <div className="shop-container">
        <motion.aside
          className="shop-filters"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-filter"
              aria-label="Search products"
            />
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                min="0"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: parseInt(e.target.value) || 0 })}
                placeholder="Min"
                className="price-input"
                aria-label="Minimum price"
              />
              <span className="separator">−</span>
              <input
                type="number"
                min="0"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) || 1000 })}
                placeholder="Max"
                className="price-input"
                aria-label="Maximum price"
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceMax}
              onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
              className="price-slider"
              aria-label="Price range slider"
            />
          </div>

          <div className="filter-section">
            <h3>Rating</h3>
            <div className="rating-filters">
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} className="rating-label">
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={filters.rating === star}
                    onChange={() => setFilters({ ...filters, rating: star })}
                  />
                  <span className="stars">{'★'.repeat(star)}{'☆'.repeat(5 - star)}</span>
                  <span className="label">& up</span>
                </label>
              ))}
              <label className="rating-label">
                <input
                  type="radio"
                  name="rating"
                  value={0}
                  checked={filters.rating === 0}
                  onChange={() => setFilters({ ...filters, rating: 0 })}
                />
                <span className="label">All Ratings</span>
              </label>
            </div>
          </div>

          <button
            className="reset-filters"
            onClick={handleResetFilters}
            aria-label="Reset all filters"
          >
            Reset Filters
          </button>
        </motion.aside>

        <div className="shop-content">
          <motion.div
            className="sort-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="results-count">
              Showing {filteredProducts.length} of {products.length} products
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="sort-select"
              aria-label="Sort products by"
            >
              <option value="relevant">Most Relevant</option>
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </motion.div>

          {loading ? (
            <SkeletonGrid count={12} />
          ) : error ? (
            <div className="no-results error-state">
              <span className="no-results-icon">⚠️</span>
              <h2>Unable to load products</h2>
              <p>{error}</p>
              <button 
                className="clear-filters-btn"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h2>No products found</h2>
              <p>Try adjusting your filters or search terms</p>
              <button
                className="clear-filters-btn"
                onClick={handleResetFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
