/**
 * URBAN CART - Category Normalization System
 * 
 * Single source of truth for category matching.
 * Handles API inconsistencies and normalizes product data.
 * 
 * Design principles:
 * - No silent failures
 * - Strict categorization
 * - Future-proof scaling
 * - Client-side resilience
 */

// Strict category definitions
export const CATEGORY_DEFINITIONS = {
  MEN: {
    id: 'men',
    label: 'Men',
    apiAliases: ['men', 'mens', 'mens-clothing', 'mens clothing', "men's clothing", "men's"],
    description: 'Men\'s Collection',
  },
  WOMEN: {
    id: 'women',
    label: 'Women',
    apiAliases: ['women', 'womens', 'womens-clothing', 'womens clothing', "women's clothing", "women's"],
    description: 'Women\'s Collection',
  },
  UNISEX: {
    id: 'unisex',
    label: 'Unisex',
    apiAliases: ['unisex', 'sunglasses', 'fragrances', 'beauty', 'home-decoration', 'furniture', 'groceries', 'sports-accessories', 'automotive'],
    description: 'Unisex Collection',
  },
  ACCESSORIES: {
    id: 'accessories',
    label: 'Accessories',
    apiAliases: ['accessories', 'mobile-accessories', 'motorcycle', 'laptops', 'tablets'],
    description: 'Accessories',
  },
};

/**
 * Normalize a product's category to UI category ID
 * @param {string} apiCategory - Raw category from API
 * @returns {string|null} - Normalized category ID or null if unmatched
 */
export const normalizeCategory = (apiCategory) => {
  if (!apiCategory || typeof apiCategory !== 'string') return null;

  const normalized = apiCategory.toLowerCase().trim();

  for (const [categoryKey, categoryDef] of Object.entries(CATEGORY_DEFINITIONS)) {
    if (categoryDef.apiAliases.includes(normalized)) {
      return categoryDef.id;
    }
  }

  return null;
};

/**
 * Categorize products from API response
 * Assigns each product to one or more UI categories
 * @param {Array} products - Products from API
 * @returns {Object} - { men: [], women: [], unisex: [], accessories: [], uncategorized: [] }
 */
export const categorizeProducts = (products = []) => {
  const result = {
    men: [],
    women: [],
    unisex: [],
    accessories: [],
    uncategorized: [],
  };

  products.forEach((product) => {
    const normalized = normalizeCategory(product.category);

    if (normalized) {
      result[normalized].push(product);
    } else {
      result.uncategorized.push(product);
    }
  });

  return result;
};

/**
 * Get products for a specific category
 * @param {Array} products - All products
 * @param {string} categoryId - Category ID (men, women, unisex, accessories)
 * @returns {Array} - Filtered products
 */
export const getProductsByUICategory = (products = [], categoryId) => {
  if (!categoryId || typeof categoryId !== 'string') return [];

  const normalized = categoryId.toLowerCase().trim();

  if (!Object.values(CATEGORY_DEFINITIONS).some(cat => cat.id === normalized)) {
    return [];
  }

  return products.filter((product) => {
    const productCategory = normalizeCategory(product.category);
    return productCategory === normalized;
  });
};

/**
 * Validate if a category string is valid
 * @param {string} categoryId - Category to validate
 * @returns {boolean}
 */
export const isValidCategory = (categoryId) => {
  return Object.values(CATEGORY_DEFINITIONS).some(cat => cat.id === categoryId?.toLowerCase()?.trim());
};

/**
 * Get all valid category IDs
 * @returns {Array} - [men, women, unisex, accessories]
 */
export const getAllCategoryIds = () => {
  return Object.values(CATEGORY_DEFINITIONS).map(cat => cat.id);
};
