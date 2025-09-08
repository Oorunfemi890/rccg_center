import axios from 'axios';
import { toast } from 'react-toastify';

// Base URL for your backend API
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('churchAdminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('churchAdminRefreshToken');
        
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken: refreshToken
          });

          if (response.data.success) {
            const { token, refreshToken: newRefreshToken } = response.data.data;
            
            localStorage.setItem('churchAdminToken', token);
            localStorage.setItem('churchAdminRefreshToken', newRefreshToken);
            
            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('churchAdminToken');
        localStorage.removeItem('churchAdminRefreshToken');
        
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your internet connection.');
    } else {
      // Handle other HTTP errors
      const status = error.response.status;
      const message = error.response.data?.message || 'An error occurred';

      switch (status) {
        case 400:
          toast.error(`Bad Request: ${message}`);
          break;
        case 403:
          toast.error('Access forbidden. You do not have permission to perform this action.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 429:
          toast.error('Too many requests. Please try again later.');
          break;
        case 500:
          toast.error('Internal server error. Please try again later.');
          break;
        default:
          toast.error(message);
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to handle file uploads
export const uploadFile = async (endpoint, file, onUploadProgress = null) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(percentCompleted);
        }
      },
    });

    return {
      success: true,
      data: response.data,
      message: 'File uploaded successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'File upload failed'
    };
  }
};

// Helper function to download files
export const downloadFile = async (endpoint, filename) => {
  try {
    const response = await apiClient.get(endpoint, {
      responseType: 'blob',
    });

    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      message: 'File downloaded successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'File download failed'
    };
  }
};