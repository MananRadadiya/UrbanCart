const API_BASE = 'https://dummyjson.com';

const categoryMap = {
  'men': 'mens-clothing',
  'women': 'womens-clothing',
  'accessories': 'accessories',
  'shoes': 'shoes',
  'unisex': 'sunglasses'
};

export const getAllProducts = async (limit = 100) => {
  try {
    const response = await fetch(`${API_BASE}/products?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return {
      success: true,
      products: data.products || [],
      total: data.total || 0,
    };
  } catch (error) {
    return { success: false, error: error.message, products: [] };
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const categoryKey = categoryMap[category.toLowerCase()] || category.toLowerCase();
    const response = await fetch(`${API_BASE}/products/category/${categoryKey}`);
    if (!response.ok) throw new Error(`Failed to fetch ${category} products`);
    const data = await response.json();
    return {
      success: true,
      products: data.products || [],
      total: data.total || 0,
    };
  } catch (error) {
    return { success: false, error: error.message, products: [] };
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    const data = await response.json();
    return { success: true, product: data };
  } catch (error) {
    return { success: false, error: error.message, product: null };
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    return {
      success: true,
      products: data.products || [],
      total: data.total || 0,
    };
  } catch (error) {
    return { success: false, error: error.message, products: [] };
  }
};

export const getProductsByFilters = async (filters = {}) => {
  try {
    const { minPrice, maxPrice, category, sortBy } = filters;
    const response = await fetch(`${API_BASE}/products?limit=100`);
    if (!response.ok) throw new Error('Failed to fetch products');
    let data = await response.json();
    let products = data.products || [];

    if (category) {
      products = products.filter(p => 
        p.category === categoryMap[category.toLowerCase()] || 
        p.category === category.toLowerCase()
      );
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      products = products.filter(p => {
        const price = p.price;
        if (minPrice !== undefined && price < minPrice) return false;
        if (maxPrice !== undefined && price > maxPrice) return false;
        return true;
      });
    }

    if (sortBy === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return {
      success: true,
      products,
      total: products.length,
    };
  } catch (error) {
    return { success: false, error: error.message, products: [] };
  }
};
