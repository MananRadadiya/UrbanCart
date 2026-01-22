export const CATEGORY_DEFINITIONS = {
  MEN: {
    id: "men",
    apiAliases: ["men", "mens", "men's clothing"],
  },
  WOMEN: {
    id: "women",
    apiAliases: ["women", "womens", "women's clothing"],
  },
};

export const normalizeCategory = (apiCategory) => {
  if (!apiCategory) return null;

  const normalized = apiCategory.toLowerCase().trim();

  for (const categoryDef of Object.values(CATEGORY_DEFINITIONS)) {
    if (categoryDef.apiAliases.includes(normalized)) {
      return categoryDef.id;
    }
  }

  return null;
};

export const getProductsByUICategory = (products = [], categoryId) =>
  products.filter(
    (p) => normalizeCategory(p.category) === categoryId
  );
