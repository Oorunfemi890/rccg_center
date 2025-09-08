import { apiClient } from './apiClient';
import { mockAuthData } from '@/data/mockAuthData';

// Mock mode flag - set to false for production
const USE_MOCK_DATA = true;

// Helper function for mock responses
const mockResponse = (data, success = true, message = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success, data, message });
    }, 1000);
  });
};

export const authAPI = {
  // Login admin
  login: async (credentials) => {
    if (USE_MOCK_DATA) {
      const { email, password } = credentials;
      
      // Check mock data
      const admin = mockAuthData.admins.find(
        admin => admin.email === email && admin.password === password
      );
      
      if (admin) {
        const { password: _, ...adminData } = admin; // Remove password from response
        return mockResponse({
          admin: adminData,
          token: mockAuthData.generateToken(),
          refreshToken: mockAuthData.generateRefreshToken()
        }, true, 'Login successful');
      } else {
        return mockResponse(null, false, 'Invalid email or password');
      }
    }

    // Production API call
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return {
        success: true,
        data: response.data,
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  // Verify token
  verifyToken: async (token) => {
    if (USE_MOCK_DATA) {
      // Simple mock verification - just check if token exists
      if (token && token.startsWith('mock_token_')) {
        const adminId = token.split('_')[2];
        const admin = mockAuthData.admins.find(a => a.id === adminId);
        
        if (admin) {
          const { password: _, ...adminData } = admin;
          return mockResponse({
            admin: adminData,
            valid: true
          }, true, 'Token valid');
        }
      }
      
      return mockResponse(null, false, 'Invalid token');
    }

    try {
      const response = await apiClient.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        message: 'Token valid'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Token verification failed'
      };
    }
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    if (USE_MOCK_DATA) {
      // Mock refresh - generate new tokens
      if (refreshToken && refreshToken.startsWith('mock_refresh_')) {
        const adminId = refreshToken.split('_')[2];
        const admin = mockAuthData.admins.find(a => a.id === adminId);
        
        if (admin) {
          const { password: _, ...adminData } = admin;
          return mockResponse({
            admin: adminData,
            token: mockAuthData.generateToken(),
            refreshToken: mockAuthData.generateRefreshToken()
          }, true, 'Token refreshed');
        }
      }
      
      return mockResponse(null, false, 'Invalid refresh token');
    }

    try {
      const response = await apiClient.post('/auth/refresh', {
        refreshToken: refreshToken
      });
      return {
        success: true,
        data: response.data,
        message: 'Token refreshed'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Token refresh failed'
      };
    }
  },

  // Logout
  logout: async (refreshToken) => {
    if (USE_MOCK_DATA) {
      return mockResponse({}, true, 'Logged out successfully');
    }

    try {
      await apiClient.post('/auth/logout', {
        refreshToken: refreshToken
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
    if (USE_MOCK_DATA) {
      // Mock update - find admin and update data
      const adminIndex = mockAuthData.admins.findIndex(a => a.id === profileData.id);
      
      if (adminIndex !== -1) {
        mockAuthData.admins[adminIndex] = { 
          ...mockAuthData.admins[adminIndex], 
          ...profileData,
          updatedAt: new Date().toISOString()
        };
        
        const { password: _, ...adminData } = mockAuthData.admins[adminIndex];
        return mockResponse({
          admin: adminData
        }, true, 'Profile updated successfully');
      }
      
      return mockResponse(null, false, 'Admin not found');
    }

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
    if (USE_MOCK_DATA) {
      const { currentPassword, newPassword, adminId } = passwordData;
      const adminIndex = mockAuthData.admins.findIndex(a => a.id === adminId);
      
      if (adminIndex !== -1) {
        const admin = mockAuthData.admins[adminIndex];
        
        if (admin.password === currentPassword) {
          mockAuthData.admins[adminIndex].password = newPassword;
          mockAuthData.admins[adminIndex].updatedAt = new Date().toISOString();
          
          return mockResponse({}, true, 'Password changed successfully');
        } else {
          return mockResponse(null, false, 'Current password is incorrect');
        }
      }
      
      return mockResponse(null, false, 'Admin not found');
    }

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