import { createContext, useContext, useState } from 'react';

const ProductContext = createContext(null);

/**
 * ProductProvider — centralizes product-related state.
 *
 * Previously this state was duplicated across Dashboard.jsx and ProductGrid.jsx.
 * Now both components share one source of truth through the useProducts hook.
 */
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/**
 * useProductState — low-level access to product context.
 * For orchestrated product loading, use useProducts from hooks/.
 */
export const useProductState = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductState must be used within a ProductProvider');
  }
  return context;
};
