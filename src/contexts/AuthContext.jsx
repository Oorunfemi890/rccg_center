import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authAPI } from '@/services/authAPI';

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload.admin,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        token: null,
        refreshToken: null,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'UPDATE_PROFILE':
      return { ...state, admin: { ...state.admin, ...action.payload } };
    case 'TOKEN_REFRESHED':
      return { 
        ...state, 
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        admin: action.payload.admin || state.admin
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  admin: null,
  token: null,
  refreshToken: null,
  loading: true, // Start with loading true for initial auth check
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // In-memory storage for tokens (since localStorage is not supported in Claude artifacts)
  const tokenStorage = {
    token: null,
    refreshToken: null,
    
    setTokens: (token, refreshToken) => {
      tokenStorage.token = token;
      tokenStorage.refreshToken = refreshToken;
      // Try to use localStorage if available (for production)
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('churchAdminToken', token);
          localStorage.setItem('churchAdminRefreshToken', refreshToken);
        }
      } catch (e) {
        // Ignore localStorage errors in Claude artifacts
        console.warn('localStorage not available, using memory storage');
      }
    },
    
    getTokens: () => {
      // First try in-memory storage
      if (tokenStorage.token && tokenStorage.refreshToken) {
        return {
          token: tokenStorage.token,
          refreshToken: tokenStorage.refreshToken
        };
      }
      
      // Then try localStorage if available
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const token = localStorage.getItem('churchAdminToken');
          const refreshToken = localStorage.getItem('churchAdminRefreshToken');
          if (token && refreshToken) {
            tokenStorage.token = token;
            tokenStorage.refreshToken = refreshToken;
            return { token, refreshToken };
          }
        }
      } catch (e) {
        // Ignore localStorage errors
      }
      
      return { token: null, refreshToken: null };
    },
    
    clearTokens: () => {
      tokenStorage.token = null;
      tokenStorage.refreshToken = null;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('churchAdminToken');
          localStorage.removeItem('churchAdminRefreshToken');
        }
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  };

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      const { token, refreshToken } = tokenStorage.getTokens();
      
      if (token && refreshToken) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          
          // Verify token with backend
          const response = await authAPI.verifyToken(token);
          
          if (response.success && response.data) {
            tokenStorage.setTokens(token, refreshToken);
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                admin: response.data.user || response.data.admin,
                token: token,
                refreshToken: refreshToken
              }
            });
          } else {
            // Try to refresh token
            const refreshResponse = await authAPI.refreshToken(refreshToken);
            
            if (refreshResponse.success && refreshResponse.data) {
              const newToken = refreshResponse.data.accessToken || refreshResponse.data.token;
              const newRefreshToken = refreshResponse.data.refreshToken || refreshToken;
              
              tokenStorage.setTokens(newToken, newRefreshToken);
              
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                  admin: refreshResponse.data.user || refreshResponse.data.admin,
                  token: newToken,
                  refreshToken: newRefreshToken
                }
              });
            } else {
              // Tokens are invalid, logout
              logout(false); // Don't call API during initialization
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          logout(false); // Don't call API during initialization
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    let refreshInterval;
    
    if (state.isAuthenticated && state.token && state.refreshToken) {
      // Refresh token every 14 minutes (assuming 15min expiry)
      refreshInterval = setInterval(async () => {
        try {
          const response = await authAPI.refreshToken(state.refreshToken);
          
          if (response.success && response.data) {
            const newToken = response.data.accessToken || response.data.token;
            const newRefreshToken = response.data.refreshToken || state.refreshToken;
            
            tokenStorage.setTokens(newToken, newRefreshToken);
            
            dispatch({
              type: 'TOKEN_REFRESHED',
              payload: {
                token: newToken,
                refreshToken: newRefreshToken,
                admin: response.data.user || response.data.admin
              }
            });
          } else {
            logout(true);
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout(true);
        }
      }, 14 * 60 * 1000); // 14 minutes
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [state.isAuthenticated, state.token, state.refreshToken]);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await authAPI.login(credentials);

      if (response.success && response.data) {
        const admin = response.data.user || response.data.admin;
        const token = response.data.accessToken || response.data.token;
        const refreshToken = response.data.refreshToken;

        if (!admin || !token || !refreshToken) {
          throw new Error('Invalid response format from server');
        }

        // Store tokens
        tokenStorage.setTokens(token, refreshToken);

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { admin, token, refreshToken }
        });

        toast.success(response.message || 'Login successful!');
        return { success: true, data: response.data };
      } else {
        const error = response.message || 'Login failed';
        dispatch({ type: 'SET_ERROR', payload: error });
        return { success: false, message: error };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async (callAPI = true) => {
    try {
      if (callAPI && state.refreshToken) {
        await authAPI.logout(state.refreshToken);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear storage and state regardless of API call result
      tokenStorage.clearTokens();
      
      dispatch({ type: 'LOGOUT' });
      
      if (callAPI) {
        toast.info('You have been logged out');
      }
    }
  };

  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await authAPI.updateProfile(profileData);

      if (response.success && response.data) {
        const updatedAdmin = response.data.admin || response.data.user || response.data;
        
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: updatedAdmin
        });
        toast.success(response.message || 'Profile updated successfully!');
        return { success: true, data: response.data };
      } else {
        const error = response.message || 'Profile update failed';
        toast.error(error);
        return { success: false, message: error };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Profile update failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const changePassword = async (passwordData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.success) {
        toast.success(response.message || 'Password changed successfully!');
        // Clear tokens to force re-login with new password
        logout(false);
        return { success: true };
      } else {
        const error = response.message || 'Password change failed';
        toast.error(error);
        return { success: false, message: error };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password change failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Get current token for API calls
  const getToken = () => {
    return state.token || tokenStorage.getTokens().token;
  };

  // Get current refresh token
  const getRefreshToken = () => {
    return state.refreshToken || tokenStorage.getTokens().refreshToken;
  };

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
    changePassword,
    getToken,
    getRefreshToken,
    clearError: () => dispatch({ type: 'CLEAR_ERROR' })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};