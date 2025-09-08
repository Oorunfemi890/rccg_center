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
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        token: null,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'UPDATE_PROFILE':
      return { ...state, admin: { ...state.admin, ...action.payload } };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  admin: null,
  token: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('churchAdminToken');
      const refreshToken = localStorage.getItem('churchAdminRefreshToken');
      
      if (token && refreshToken) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          
          // Verify token with backend
          const response = await authAPI.verifyToken(token);
          
          if (response.success) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                admin: response.data.admin,
                token: token
              }
            });
          } else {
            // Try to refresh token
            const refreshResponse = await authAPI.refreshToken(refreshToken);
            
            if (refreshResponse.success) {
              localStorage.setItem('churchAdminToken', refreshResponse.data.token);
              localStorage.setItem('churchAdminRefreshToken', refreshResponse.data.refreshToken);
              
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                  admin: refreshResponse.data.admin,
                  token: refreshResponse.data.token
                }
              });
            } else {
              // Tokens are invalid, logout
              logout();
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
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
    
    if (state.isAuthenticated && state.token) {
      // Refresh token every 14 minutes (assuming 15min expiry)
      refreshInterval = setInterval(async () => {
        const refreshToken = localStorage.getItem('churchAdminRefreshToken');
        
        if (refreshToken) {
          try {
            const response = await authAPI.refreshToken(refreshToken);
            
            if (response.success) {
              localStorage.setItem('churchAdminToken', response.data.token);
              localStorage.setItem('churchAdminRefreshToken', response.data.refreshToken);
              
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                  admin: response.data.admin,
                  token: response.data.token
                }
              });
            } else {
              logout();
            }
          } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
          }
        }
      }, 14 * 60 * 1000); // 14 minutes
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [state.isAuthenticated, state.token]);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await authAPI.login(credentials);

      if (response.success) {
        const { admin, token, refreshToken } = response.data;

        // Store tokens
        localStorage.setItem('churchAdminToken', token);
        localStorage.setItem('churchAdminRefreshToken', refreshToken);

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { admin, token }
        });

        toast.success('Login successful!');
        return { success: true };
      } else {
        const error = response.message || 'Login failed';
        dispatch({ type: 'SET_ERROR', payload: error });
        toast.error(error);
        return { success: false, message: error };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('churchAdminRefreshToken');
      
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear storage and state regardless of API call result
      localStorage.removeItem('churchAdminToken');
      localStorage.removeItem('churchAdminRefreshToken');
      
      dispatch({ type: 'LOGOUT' });
      toast.info('You have been logged out');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await authAPI.updateProfile(profileData);

      if (response.success) {
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: response.data.admin
        });
        toast.success('Profile updated successfully!');
        return { success: true };
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

      const response = await authAPI.changePassword(passwordData);

      if (response.success) {
        toast.success('Password changed successfully!');
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

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
    changePassword,
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