import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import '../../styles/Dashboard.css';

/**
 * Dashboard — pure presentation.
 * All data and actions come from hooks. No direct API or state imports.
 */
export default function Dashboard() {
  const { user, handleLogout } = useAuthActions();
  const navigate = useNavigate();
  const {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    loading,
    favorites,
    toggleFavorite,
    getDiscountPercent,
  } = useProducts();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Products</h1>
          <span className="dashboard-welcome">Welcome, {user?.name}</span>
        </div>
        <button className="dashboard-logout" onClick={() => { handleLogout(); navigate('/login'); }}>
          Logout
        </button>
      </header>

      <div className="dashboard-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="dashboard-loading">
          <div className="spinner"></div>
        </div>
      )}

      {!loading && (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <button
                  className="love-btn"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={favorites[product.id] ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={favorites[product.id] ? '#e53e3e' : 'none'}
                    stroke={favorites[product.id] ? '#e53e3e' : '#ffffff'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                {product.hasDiscount && (
                  <span className="discount-badge">
                    -{getDiscountPercent(product.originalPrice, product.price)}%
                  </span>
                )}

                {product.stock === 0 && (
                  <span className="out-of-stock-badge">Out of Stock</span>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>

                <div className="product-price-row">
                  <div className="price-group">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    {product.hasDiscount && (
                      <span className="product-original-price">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="product-stock">
                  {product.stock > 0 ? (
                    <span className={`stock-text ${product.stock <= 5 ? 'stock-low' : 'stock-ok'}`}>
                      {product.stock <= 5
                        ? `Only ${product.stock} left`
                        : `${product.stock} in stock`
                      }
                    </span>
                  ) : (
                    <span className="stock-text stock-none">Unavailable</span>
                  )}
                </div>

                <button
                  className="add-to-cart-btn"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
