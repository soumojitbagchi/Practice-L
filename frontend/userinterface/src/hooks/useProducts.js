import { useEffect } from 'react';
import { useProductState } from '../state/ProductContext';
import { fetchAllProducts, fetchCategories, fetchProductsByCategory } from '../api/productApi';

/**
 * useProducts — orchestration hook for product data.
 *
 * Bridges the API layer (productApi) with the State layer (ProductContext).
 * - On mount: loads categories
 * - On category change: loads filtered products
 *
 * Used by both ProductGrid and Dashboard — eliminates duplicated fetch logic.
 *
 * Flow: UI → useProducts → productApi (HTTP) → ProductContext (state update)
 */
export const useProducts = () => {
  const {
    products,
    setProducts,
    categories,
    setCategories,
    activeCategory,
    setActiveCategory,
    loading,
    setLoading,
    error,
    setError,
    favorites,
    toggleFavorite,
  } = useProductState();

  // Load categories on mount
  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(['all', ...data]))
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  // Load products when active category changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const loadProducts =
      activeCategory === 'all'
        ? fetchAllProducts()
        : fetchProductsByCategory(activeCategory);

    loadProducts
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  /**
   * Calculates the discount percentage
   * between the original and current price.
   */
  const getDiscountPercent = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    loading,
    error,
    favorites,
    toggleFavorite,
    getDiscountPercent,
  };
};
