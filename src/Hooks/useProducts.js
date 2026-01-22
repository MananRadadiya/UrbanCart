import { useState, useEffect } from 'react';
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  getProductsByFilters,
} from '../Services/ProductService';

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { category, search, filters } = options;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let result;

      if (search) {
        result = await searchProducts(search);
      } else if (filters && Object.keys(filters).length > 0) {
        result = await getProductsByFilters(filters);
      } else if (category) {
        result = await getProductsByCategory(category);
      } else {
        result = await getAllProducts();
      }

      if (result.success) {
        setProducts(result.products);
      } else {
        setError(result.error);
        setProducts([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [category, search, filters]);

  return { products, loading, error };
};
