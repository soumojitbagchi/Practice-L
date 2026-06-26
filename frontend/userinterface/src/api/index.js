/**
 * API Layer — barrel export
 * All backend communication flows through this module.
 */
export { loginUser, registerUser } from './authApi';
export { fetchAllProducts, fetchCategories, fetchProductsByCategory } from './productApi';
export { default as apiClient } from './apiClient';
