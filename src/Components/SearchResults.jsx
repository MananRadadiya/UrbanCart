import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { SkeletonGrid } from './SkeletonLoader';
import { useProducts } from '../Hooks';
import '../Styles/SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, loading } = useProducts({ search: query });

  const results = useMemo(
    () =>
      products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      ),
    [products, query]
  );

  return (
    <div className="search-results-page">
      <motion.div
        className="search-results-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Search Results</h1>
        <p>
          {query && (
            <>
              Found <strong>{results.length}</strong> products for <strong>"{query}"</strong>
            </>
          )}
        </p>
      </motion.div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : results.length === 0 ? (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h2>No products found</h2>
          <p>Try different search terms or browse our collections</p>
        </div>
      ) : (
        <motion.div
          className="search-results-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.05 }}
        >
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchResults;
