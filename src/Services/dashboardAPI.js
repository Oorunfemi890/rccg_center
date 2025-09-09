// src/Services/dashboardAPI.js - Production Ready
import { apiClient } from './apiClient';

export const dashboardAPI = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return {
        success: true,
        data: response.data.data,
        message: 'Stats retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch stats'
      };
    }
  },

  // Get recent activities
  getRecentActivities: async () => {
    try {
      const response = await apiClient.get('/dashboard/recent-activities');
      return {
        success: true,
        data: response.data.data,
        message: 'Recent activities retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch recent activities'
      };
    }
  },

  // Get upcoming events
  getUpcomingEvents: async (limit = 10) => {
    try {
      const response = await apiClient.get(`/dashboard/upcoming-events?limit=${limit}`);
      return {
        success: true,
        data: response.data.data,
        message: 'Upcoming events retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch upcoming events'
      };
    }
  },

  // Get attendance summary
  getAttendanceSummary: async (period = 'week') => {
    try {
      const response = await apiClient.get(`/dashboard/attendance-summary?period=${period}`);
      return {
        success: true,
        data: response.data.data,
        message: 'Attendance summary retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch attendance summary'
      };
    }
  },

  // Get member growth data
  getMemberGrowth: async (period = 'year') => {
    try {
      const response = await apiClient.get(`/dashboard/member-growth?period=${period}`);
      return {
        success: true,
        data: response.data.data,
        message: 'Member growth data retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch member growth data'
      };
    }
  }
};