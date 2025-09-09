// src/Services/authApi.js - Production Ready
import { apiClient } from './apiClient';

export const authAPI = {
  // Login admin
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      
      if (response.data.success) {
        return {
          success: true,
          data: {
            admin: response.data.data.admin,
            token: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken
          },
          message: response.data.message || 'Login successful'
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Login failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      const response = await apiClient.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        return {
          success: true,
          data: {
            admin: response.data.data.admin,
            valid: true
          },
          message: 'Token valid'
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Token verification failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Token verification failed'
      };
    }
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    try {
      const response = await apiClient.post('/auth/refresh', {}, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (response.data.success) {
        return {
          success: true,
          data: {
            admin: response.data.data.admin,
            token: response.data.data.accessToken,
            refreshToken: refreshToken
          },
          message: 'Token refreshed'
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Token refresh failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Token refresh failed'
      };
    }
  },

  // Logout
  logout: async (refreshToken) => {
    try {
      await apiClient.post('/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      });
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Logout failed'
      };
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/auth/profile', profileData);
      return {
        success: true,
        data: response.data,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed'
      };
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      await apiClient.put('/auth/change-password', passwordData);
      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed'
      };
    }
  }
};