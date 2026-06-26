import { useState } from 'react';
import { useAuth } from '../state/AuthContext';
import { loginUser, registerUser } from '../api/authApi';

/**
 * useAuthActions — orchestration hook for authentication flows.
 *
 * Bridges the API layer (authApi) with the State layer (AuthContext).
 * UI components call these methods instead of importing axios directly.
 *
 * Flow: UI → useAuthActions → authApi (HTTP) → AuthContext (state update)
 */
export const useAuthActions = () => {
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle login — calls API, updates auth state.
   * @returns {{ success: boolean }}
   */
  const handleLogin = async (email, password) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      auth.login(data.token);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle signup — calls API, updates auth state.
   * @returns {{ success: boolean }}
   */
  const handleSignup = async (user, email, password) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const data = await registerUser(user, email, password);
      auth.login(data.token);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Signup failed');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle logout — clears auth state.
   */
  const handleLogout = () => {
    auth.logout();
  };

  return {
    // State from AuthContext
    user: auth.user,
    loading: auth.loading,

    // Orchestrated actions
    handleLogin,
    handleSignup,
    handleLogout,

    // Action state
    isSubmitting,
    error,
    clearError: () => setError(null),
  };
};
