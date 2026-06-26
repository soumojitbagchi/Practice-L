import apiClient from './apiClient';

/**
 * Auth API — pure HTTP calls, no state management.
 */

/** POST /auth/login → { message, token } */
export const loginUser = async (email, password) => {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data;
};

/** POST /auth/register → { message, token } */
export const registerUser = async (user, email, password) => {
  const { data } = await apiClient.post('/auth/register', { user, email, password });
  return data;
};
