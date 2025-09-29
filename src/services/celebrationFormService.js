// src/services/celebrationFormService.js - For Church Main Site
import axios from 'axios';

// Base URL for your backend API
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://rccg-centre-backend-10.onrender.com/api";

// Create axios instance for public API calls (no auth required)
const publicApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Request interceptor for logging
publicApiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
publicApiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} - ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle different error types
    if (!error.response) {
      // Network error
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data?.message || 'Invalid request. Please check your input and try again.');
      case 413:
        throw new Error('Files are too large. Please upload smaller images (max 5MB each).');
      case 429:
        throw new Error('Too many requests. Please wait a moment and try again.');
      case 500:
        throw new Error('Server error. Please try again later or contact support.');
      default:
        throw new Error(data?.message || 'An unexpected error occurred. Please try again.');
    }
  }
);

export const celebrationFormService = {
  /**
   * Submit celebration form data
   * @param {Object} celebrationData - Form data including files
   * @returns {Promise<Object>} API response
   */
  submitCelebration: async (celebrationData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append text fields
      formData.append('type', celebrationData.celebrationType);
      formData.append('name', celebrationData.name);
      formData.append('phone', celebrationData.phone);
      formData.append('email', celebrationData.email || '');
      formData.append('message', celebrationData.message || '');
      formData.append('month', celebrationData.month);
      formData.append('date', celebrationData.date);
      
      // Append year if provided
      if (celebrationData.year) {
        formData.append('year', celebrationData.year);
      }
      
      // Append files
      if (celebrationData.pictures && celebrationData.pictures.length > 0) {
        for (let i = 0; i < celebrationData.pictures.length; i++) {
          formData.append('pictures', celebrationData.pictures[i]);
        }
      }
      
      // Log form data for debugging (excluding files)
      console.log('Submitting celebration:', {
        type: celebrationData.celebrationType,
        name: celebrationData.name,
        phone: celebrationData.phone,
        email: celebrationData.email,
        month: celebrationData.month,
        date: celebrationData.date,
        filesCount: celebrationData.pictures?.length || 0
      });
      
      const response = await publicApiClient.post('/public/celebrations', formData);
      
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Celebration submitted successfully!'
      };
      
    } catch (error) {
      console.error('Celebration submission error:', error);
      
      return {
        success: false,
        message: error.message || 'Failed to submit celebration. Please try again.',
        error: error.response?.data || error
      };
    }
  },

  /**
   * Get celebration types for form dropdown
   * @returns {Array} Available celebration types
   */
  getCelebrationTypes: () => {
    return [
      { value: 'Birthday', label: 'Birthday 🎂', emoji: '🎂' },
      { value: 'Wedding Anniversary', label: 'Wedding Anniversary 💍', emoji: '💍' },
      { value: 'Baby Dedication', label: 'Baby Dedication 👶', emoji: '👶' },
      { value: 'Graduation', label: 'Graduation 🎓', emoji: '🎓' },
      { value: 'Promotion', label: 'Career Promotion 💼', emoji: '💼' },
      { value: 'New Job', label: 'New Job 🎯', emoji: '🎯' },
      { value: 'New Baby', label: 'New Baby 🍼', emoji: '🍼' },
      { value: 'House Dedication', label: 'House Dedication 🏠', emoji: '🏠' },
      { value: 'Special Achievement', label: 'Special Achievement 🏆', emoji: '🏆' },
      { value: 'Other', label: 'Other Celebration 🎉', emoji: '🎉' }
    ];
  },

  /**
   * Validate form data before submission
   * @param {Object} formData - Form data to validate
   * @returns {Object} Validation result
   */
  validateForm: (formData) => {
    const errors = {};
    
    // Required field validations
    if (!formData.celebrationType) {
      errors.celebrationType = 'Please select a celebration type';
    }
    
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.phone || formData.phone.trim().length < 10) {
      errors.phone = 'Please provide a valid phone number';
    }
    
    // Email validation (optional but must be valid if provided)
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please provide a valid email address';
      }
    }
    
    if (!formData.month || !formData.date) {
      errors.date = 'Please select both month and date';
    }
    
    // Date validation
    if (formData.month && formData.date) {
      const month = parseInt(formData.month);
      const date = parseInt(formData.date);
      
      if (month < 1 || month > 12) {
        errors.month = 'Please select a valid month';
      }
      
      if (date < 1 || date > 31) {
        errors.date = 'Please select a valid date';
      }
      
      // Check if date exists in the selected month
      const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
      if (date > daysInMonth) {
        errors.date = `${getMonthName(month)} only has ${daysInMonth} days`;
      }
    }
    
    // File validations
    if (!formData.pictures || formData.pictures.length === 0) {
      errors.pictures = 'Please upload at least one picture';
    } else {
      if (formData.pictures.length > 5) {
        errors.pictures = 'You can upload a maximum of 5 pictures';
      }
      
      // Check file types and sizes
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      for (let i = 0; i < formData.pictures.length; i++) {
        const file = formData.pictures[i];
        
        if (!allowedTypes.includes(file.type)) {
          errors.pictures = `File "${file.name}" is not a valid image type. Please use JPG, PNG, GIF, or WebP.`;
          break;
        }
        
        if (file.size > maxSize) {
          errors.pictures = `File "${file.name}" is too large. Maximum size is 5MB per file.`;
          break;
        }
      }
    }
    
    // Message length validation (optional)
    if (formData.message && formData.message.length > 1000) {
      errors.message = 'Message must be less than 1000 characters';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  /**
   * Get number of days in a specific month
   * @param {number} month - Month number (1-12)
   * @param {number} year - Year (optional, defaults to current year)
   * @returns {number} Number of days in the month
   */
  getDaysInMonth: (month, year = new Date().getFullYear()) => {
    return new Date(year, month, 0).getDate();
  },

  /**
   * Generate date options for a given month
   * @param {number} month - Month number (1-12)
   * @returns {Array} Array of date options
   */
  getDateOptions: (month) => {
    if (!month) return [];
    
    const daysInMonth = celebrationFormService.getDaysInMonth(parseInt(month));
    const options = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      options.push({
        value: i,
        label: i,
        suffix: getDateSuffix(i)
      });
    }
    
    return options;
  },

  /**
   * Get months array for dropdown
   * @returns {Array} Array of month options
   */
  getMonthOptions: () => {
    return [
      { value: 1, label: 'January', short: 'Jan' },
      { value: 2, label: 'February', short: 'Feb' },
      { value: 3, label: 'March', short: 'Mar' },
      { value: 4, label: 'April', short: 'Apr' },
      { value: 5, label: 'May', short: 'May' },
      { value: 6, label: 'June', short: 'Jun' },
      { value: 7, label: 'July', short: 'Jul' },
      { value: 8, label: 'August', short: 'Aug' },
      { value: 9, label: 'September', short: 'Sep' },
      { value: 10, label: 'October', short: 'Oct' },
      { value: 11, label: 'November', short: 'Nov' },
      { value: 12, label: 'December', short: 'Dec' }
    ];
  },

  /**
   * Format phone number for display
   * @param {string} phone - Raw phone number
   * @returns {string} Formatted phone number
   */
  formatPhoneNumber: (phone) => {
    if (!phone) return '';
    
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format based on length (assuming Nigerian format)
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
      return `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `+234 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length === 13 && cleaned.startsWith('234')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    }
    
    return phone; // Return original if no format matches
  }
};

// Helper functions
const getMonthName = (monthNumber) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthNumber - 1] || '';
};

const getDateSuffix = (date) => {
  if (date >= 11 && date <= 13) {
    return 'th';
  }
  switch (date % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export default celebrationFormService;