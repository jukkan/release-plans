import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

/**
 * Authentication store using Zustand
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      /**
       * Login user
       * @param {string} email - User email
       * @param {string} password - User password
       */
      login: async (email, password) => {
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token, user } = response.data;

          localStorage.setItem('token', token);
          set({ user, token, isAuthenticated: true });

          return { success: true };
        } catch (error) {
          console.error('Login failed:', error);
          return {
            success: false,
            error: error.response?.data?.error || 'Login failed',
          };
        }
      },

      /**
       * Logout user
       */
      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      /**
       * Check authentication status
       */
      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ user: null, token: null, isAuthenticated: false });
          return false;
        }

        try {
          const response = await api.get('/auth/me');
          set({ user: response.data.user, token, isAuthenticated: true });
          return true;
        } catch (error) {
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
          return false;
        }
      },

      /**
       * Get current user
       */
      getUser: () => get().user,

      /**
       * Check if user has specific role
       * @param {string} role - Role to check
       */
      hasRole: (role) => {
        const user = get().user;
        return user?.role === role;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Custom hook for authentication
 * @returns {Object} Auth state and methods
 */
export function useAuth() {
  const { user, token, isAuthenticated, login, logout, checkAuth, hasRole } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    hasRole,
  };
}

export default useAuthStore;
