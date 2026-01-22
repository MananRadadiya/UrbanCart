import { useState, useEffect } from "react";
import { getAllProducts } from "../Services/ProductService";
import { getProductsByUICategory } from "../Utils/categoryNormalizer";

// Cache
let productCache = null;
let cachePromise = null;

export const useProductsByCategory = (categoryId = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!productCache) {
          if (!cachePromise) {
            cachePromise = getAllProducts(200);
          }
          const result = await cachePromise;
          productCache = result.products || [];
        }

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

// ✅ ADD THIS EXPORT (THIS FIXES THE BUILD)
export const clearProductCache = () => {
  productCache = null;
  cachePromise = null;
};
