/**
 * useProductsByCategory - Intelligent product fetching with client-side filtering
 * 
 * This hook replaces the broken category-based fetching.
 * It fetches all products once and filters client-side,
 * ensuring 100% reliability and fast subsequent requests.
 */

import { useState, useEffect, useMemo } from 'react';
import { getAllProducts } from '../Services/ProductService';
import { getProductsByUICategory } from '../Utils/categoryNormalizer';

// Simple cache for all products
let productCache = null;
let cachePromise = null;

/**
 * Hook: Get products by category with intelligent client-side filtering
 * @param {string} categoryId - Category ID (men, women, unisex, accessories) or null for all
 * @returns {Object} - { products, loading, error }
 */
export const useProductsByCategory = (categoryId = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use cached data if available, otherwise fetch
        if (!productCache) {
          if (!cachePromise) {
            cachePromise = getAllProducts(200); // Fetch up to 200 products
          }
          const result = await cachePromise;
          if (result.success) {
            productCache = result.products || [];
          } else {
            throw new Error(result.error || 'Failed to fetch products');
          }
        }

        // Filter by category if specified
        const filtered = categoryId
          ? getProductsByUICategory(productCache, categoryId)
          : productCache;

        setProducts(filtered);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return { products, loading, error };
};

/**
 * Clear cache (useful for testing or forced refresh)
 */
export const clearProductCache = () => {
  productCache = null;
  cachePromise = null;
};
