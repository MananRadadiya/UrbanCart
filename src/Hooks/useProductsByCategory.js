import { useState, useEffect } from "react";
import { getAllProducts } from "../Services/ProductService";
import { getProductsByUICategory } from "../Utils/categoryNormalizer";

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

        if (!productCache) {
          if (!cachePromise) cachePromise = getAllProducts(200);
          const result = await cachePromise;
          productCache = result.products || [];
        }

        const filtered = categoryId
          ? getProductsByUICategory(productCache, categoryId)
          : productCache;

        setProducts(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return { products, loading, error };
};
