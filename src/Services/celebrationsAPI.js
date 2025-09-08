import { apiClient } from './apiClient';
import { mockAuthData } from '@/data/mockAuthData';

// Mock mode flag - set to false for production
const USE_MOCK_DATA = true;

// Helper function for mock responses
const mockResponse = (data, success = true, message = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success, data, message });
    }, 500);
  });
};

export const celebrationsAPI = {
  // Get all celebrations
  getCelebrations: async (filters = {}) => {
    if (USE_MOCK_DATA) {
      let filteredCelebrations = [...mockAuthData.celebrations];

      // Apply filters
      if (filters.status) {
        filteredCelebrations = filteredCelebrations.filter(celebration => 
          celebration.status === filters.status
        );
      }

      if (filters.type) {
        filteredCelebrations = filteredCelebrations.filter(celebration => 
          celebration.type === filters.type
        );
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredCelebrations = filteredCelebrations.filter(celebration =>
          celebration.name.toLowerCase().includes(searchTerm) ||
          celebration.type.toLowerCase().includes(searchTerm)
        );
      }

      // Sort by creation date (newest first)
      filteredCelebrations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return mockResponse(filteredCelebrations, true, 'Celebrations retrieved successfully');
    }

    try {
      const response = await apiClient.get('/celebrations', { params: filters });
      return {
        success: true,
        data: response.data,
        message: 'Celebrations retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch celebrations'
      };
    }
  },

  // Get celebration by ID
  getCelebrationById: async (id) => {
    if (USE_MOCK_DATA) {
      const celebration = mockAuthData.celebrations.find(c => c.id === id);
      if (celebration) {
        return mockResponse(celebration, true, 'Celebration details retrieved successfully');
      } else {
        return mockResponse(null, false, 'Celebration not found');
      }
    }

    try {
      const response = await apiClient.get(`/celebrations/${id}`);
      return {
        success: true,
        data: response.data,
        message: 'Celebration details retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch celebration details'
      };
    }
  },

  // Create new celebration (from public form)
  createCelebration: async (celebrationData) => {
    if (USE_MOCK_DATA) {
      const newCelebration = mockAuthData.addCelebration(celebrationData);
      return mockResponse(newCelebration, true, 'Celebration request submitted successfully');
    }

    try {
      const response = await apiClient.post('/celebrations', celebrationData);
      return {
        success: true,
        data: response.data,
        message: 'Celebration request submitted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to submit celebration request'
      };
    }
  },

  // Update celebration status
  updateCelebrationStatus: async (id, statusData) => {
    if (USE_MOCK_DATA) {
      const updatedCelebration = mockAuthData.updateCelebration(id, statusData);
      if (updatedCelebration) {
        return mockResponse(updatedCelebration, true, 'Celebration status updated successfully');
      } else {
        return mockResponse(null, false, 'Celebration not found');
      }
    }

    try {
      const response = await apiClient.patch(`/celebrations/${id}/status`, statusData);
      return {
        success: true,
        data: response.data,
        message: 'Celebration status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update celebration status'
      };
    }
  },

  // Delete celebration
  deleteCelebration: async (id) => {
    if (USE_MOCK_DATA) {
      const index = mockAuthData.celebrations.findIndex(c => c.id === id);
      if (index !== -1) {
        mockAuthData.celebrations.splice(index, 1);
        return mockResponse({}, true, 'Celebration deleted successfully');
      } else {
        return mockResponse(null, false, 'Celebration not found');
      }
    }

    try {
      await apiClient.delete(`/celebrations/${id}`);
      return {
        success: true,
        message: 'Celebration deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete celebration'
      };
    }
  },

  // Get celebration statistics
  getCelebrationsStats: async () => {
    if (USE_MOCK_DATA) {
      const totalCelebrations = mockAuthData.celebrations.length;
      const pendingCelebrations = mockAuthData.celebrations.filter(c => c.status === 'pending').length;
      const approvedCelebrations = mockAuthData.celebrations.filter(c => c.status === 'approved').length;
      const rejectedCelebrations = mockAuthData.celebrations.filter(c => c.status === 'rejected').length;

      // This month's celebrations
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const thisMonthCelebrations = mockAuthData.celebrations.filter(c => 
        new Date(c.createdAt) >= thisMonth
      ).length;

      // Type breakdown
      const typeStats = {};
      mockAuthData.celebrations.forEach(celebration => {
        typeStats[celebration.type] = (typeStats[celebration.type] || 0) + 1;
      });

      const stats = {
        totalCelebrations,
        pendingCelebrations,
        approvedCelebrations,
        rejectedCelebrations,
        thisMonthCelebrations,
        typeStats
      };

      return mockResponse(stats, true, 'Celebration statistics retrieved successfully');
    }

    try {
      const response = await apiClient.get('/celebrations/stats');
      return {
        success: true,
        data: response.data,
        message: 'Celebration statistics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch celebration statistics'
      };
    }
  },

  // Get upcoming celebrations (for acknowledgment)
  getUpcomingCelebrations: async (limit = 10) => {
    if (USE_MOCK_DATA) {
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentDate = now.getDate();

      const upcomingCelebrations = mockAuthData.celebrations
        .filter(celebration => {
          const celebrationMonth = parseInt(celebration.month);
          const celebrationDate = parseInt(celebration.date);
          
          // Check if celebration is this month and hasn't passed, or next month
          return (celebrationMonth === currentMonth && celebrationDate >= currentDate) ||
                 (celebrationMonth === (currentMonth % 12) + 1);
        })
        .filter(celebration => celebration.status === 'approved')
        .sort((a, b) => {
          const aMonth = parseInt(a.month);
          const aDate = parseInt(a.date);
          const bMonth = parseInt(b.month);
          const bDate = parseInt(b.date);
          
          if (aMonth !== bMonth) return aMonth - bMonth;
          return aDate - bDate;
        })
        .slice(0, limit);

      return mockResponse(upcomingCelebrations, true, 'Upcoming celebrations retrieved successfully');
    }

    try {
      const response = await apiClient.get(`/celebrations/upcoming?limit=${limit}`);
      return {
        success: true,
        data: response.data,
        message: 'Upcoming celebrations retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch upcoming celebrations'
      };
    }
  },

  // Export celebrations
  exportCelebrations: async (format = 'csv', filters = {}) => {
    if (USE_MOCK_DATA) {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Filter celebrations based on filters
      let celebrationsToExport = mockAuthData.celebrations;
      
      if (filters.status) {
        celebrationsToExport = celebrationsToExport.filter(c => c.status === filters.status);
      }
      
      if (filters.type) {
        celebrationsToExport = celebrationsToExport.filter(c => c.type === filters.type);
      }

      // Mock CSV generation
      const csvContent = `Name,Type,Phone,Month,Date,Status,Message,Submitted Date,Acknowledged Date
${celebrationsToExport.map(celebration => 
        `"${celebration.name}","${celebration.type}","${celebration.phone}",${celebration.month},${celebration.date},${celebration.status},"${celebration.message || ''}",${celebration.createdAt},${celebration.acknowledgedDate || ''}`
      ).join('\n')}`;

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `celebrations_export_${new Date().toISOString().split('T')[0]}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return mockResponse({ 
        filename: `celebrations_export_${new Date().toISOString().split('T')[0]}.${format}`,
        count: celebrationsToExport.length 
      }, true, 'Celebrations exported successfully');
    }

    try {
      const response = await apiClient.get('/celebrations/export', {
        params: { format, ...filters },
        responseType: 'blob'
      });

      const filename = `celebrations_export_${new Date().toISOString().split('T')[0]}.${format}`;
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
        data: { filename },
        message: 'Celebrations exported successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to export celebrations'
      };
    }
  }
};