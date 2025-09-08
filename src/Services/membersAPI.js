import { apiClient } from './apiClient';
import { mockAuthData } from '@/data/mockAuthData';

// Mock mode flag - set to false for production
const USE_MOCK_DATA = true;

// Helper function for mock responses
const mockResponse = (data, success = true, message = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success, data, message });
    }, 800);
  });
};

export const membersAPI = {
  // Get all members
  getMembers: async (filters = {}) => {
    if (USE_MOCK_DATA) {
      let filteredMembers = [...mockAuthData.members];

      // Apply filters
      if (filters.status) {
        filteredMembers = filteredMembers.filter(member => 
          filters.status === 'active' ? member.isActive : !member.isActive
        );
      }

      if (filters.department) {
        filteredMembers = filteredMembers.filter(member => 
          member.department === filters.department
        );
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredMembers = filteredMembers.filter(member =>
          member.name.toLowerCase().includes(searchTerm) ||
          member.email.toLowerCase().includes(searchTerm) ||
          member.phone.includes(searchTerm)
        );
      }

      return mockResponse(filteredMembers, true, 'Members retrieved successfully');
    }

    try {
      const response = await apiClient.get('/members', { params: filters });
      return {
        success: true,
        data: response.data,
        message: 'Members retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch members'
      };
    }
  },

  // Get member by ID
  getMemberById: async (id) => {
    if (USE_MOCK_DATA) {
      const member = mockAuthData.members.find(m => m.id === id);
      if (member) {
        return mockResponse(member, true, 'Member details retrieved successfully');
      } else {
        return mockResponse(null, false, 'Member not found');
      }
    }

    try {
      const response = await apiClient.get(`/members/${id}`);
      return {
        success: true,
        data: response.data,
        message: 'Member details retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch member details'
      };
    }
  },

  // Add new member
  addMember: async (memberData) => {
    if (USE_MOCK_DATA) {
      const newMember = mockAuthData.addMember(memberData);
      return mockResponse(newMember, true, 'Member added successfully');
    }

    try {
      const response = await apiClient.post('/members', memberData);
      return {
        success: true,
        data: response.data,
        message: 'Member added successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add member'
      };
    }
  },

  // Update member
  updateMember: async (id, memberData) => {
    if (USE_MOCK_DATA) {
      const updatedMember = mockAuthData.updateMember(id, memberData);
      if (updatedMember) {
        return mockResponse(updatedMember, true, 'Member updated successfully');
      } else {
        return mockResponse(null, false, 'Member not found');
      }
    }

    try {
      const response = await apiClient.put(`/members/${id}`, memberData);
      return {
        success: true,
        data: response.data,
        message: 'Member updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update member'
      };
    }
  },

  // Update member status (active/inactive)
  updateMemberStatus: async (id, status) => {
    if (USE_MOCK_DATA) {
      const updatedMember = mockAuthData.updateMember(id, { isActive: status });
      if (updatedMember) {
        return mockResponse(updatedMember, true, 'Member status updated successfully');
      } else {
        return mockResponse(null, false, 'Member not found');
      }
    }

    try {
      const response = await apiClient.patch(`/members/${id}/status`, { isActive: status });
      return {
        success: true,
        data: response.data,
        message: 'Member status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update member status'
      };
    }
  },

  // Delete member (soft delete - set inactive)
  deleteMember: async (id) => {
    if (USE_MOCK_DATA) {
      const updatedMember = mockAuthData.updateMember(id, { isActive: false });
      if (updatedMember) {
        return mockResponse({}, true, 'Member deleted successfully');
      } else {
        return mockResponse(null, false, 'Member not found');
      }
    }

    try {
      await apiClient.delete(`/members/${id}`);
      return {
        success: true,
        message: 'Member deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete member'
      };
    }
  },

  // Get member statistics
  getMemberStats: async () => {
    if (USE_MOCK_DATA) {
      const totalMembers = mockAuthData.members.length;
      const activeMembers = mockAuthData.members.filter(m => m.isActive).length;
      const inactiveMembers = totalMembers - activeMembers;
      
      // Department breakdown
      const departmentStats = {};
      mockAuthData.members.forEach(member => {
        if (member.department) {
          departmentStats[member.department] = (departmentStats[member.department] || 0) + 1;
        }
      });

      // Gender breakdown
      const genderStats = {
        Male: mockAuthData.members.filter(m => m.gender === 'Male').length,
        Female: mockAuthData.members.filter(m => m.gender === 'Female').length
      };

      // Age group breakdown (mock calculation)
      const ageGroups = {
        '18-30': Math.floor(totalMembers * 0.3),
        '31-50': Math.floor(totalMembers * 0.4),
        '51-70': Math.floor(totalMembers * 0.25),
        '70+': Math.floor(totalMembers * 0.05)
      };

      const stats = {
        totalMembers,
        activeMembers,
        inactiveMembers,
        departmentStats,
        genderStats,
        ageGroups,
        recentJoins: mockAuthData.members
          .sort((a, b) => new Date(b.membershipDate) - new Date(a.membershipDate))
          .slice(0, 5)
      };

      return mockResponse(stats, true, 'Member statistics retrieved successfully');
    }

    try {
      const response = await apiClient.get('/members/stats');
      return {
        success: true,
        data: response.data,
        message: 'Member statistics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch member statistics'
      };
    }
  },

  // Search members
  searchMembers: async (query) => {
    if (USE_MOCK_DATA) {
      const searchTerm = query.toLowerCase();
      const results = mockAuthData.members.filter(member =>
        member.name.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.phone.includes(searchTerm) ||
        member.department.toLowerCase().includes(searchTerm) ||
        member.occupation.toLowerCase().includes(searchTerm)
      );

      return mockResponse(results, true, `Found ${results.length} members`);
    }

    try {
      const response = await apiClient.get(`/members/search?q=${encodeURIComponent(query)}`);
      return {
        success: true,
        data: response.data,
        message: `Found ${response.data.length} members`
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to search members'
      };
    }
  },

  // Get departments list
  getDepartments: async () => {
    if (USE_MOCK_DATA) {
      const departments = [...new Set(mockAuthData.members.map(m => m.department))].filter(Boolean);
      return mockResponse(departments, true, 'Departments retrieved successfully');
    }

    try {
      const response = await apiClient.get('/members/departments');
      return {
        success: true,
        data: response.data,
        message: 'Departments retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch departments'
      };
    }
  },

  // Import members from CSV/Excel
  importMembers: async (file, onProgress = null) => {
    if (USE_MOCK_DATA) {
      // Simulate file processing
      const totalSteps = 5;
      for (let i = 0; i <= totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (onProgress) {
          onProgress((i / totalSteps) * 100);
        }
      }

      // Mock imported data
      const importResult = {
        totalProcessed: 25,
        successful: 23,
        failed: 2,
        duplicates: 3,
        errors: [
          { row: 15, error: 'Invalid email format' },
          { row: 22, error: 'Missing required field: name' }
        ]
      };

      return mockResponse(importResult, true, 'Members imported successfully');
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post('/members/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });

      return {
        success: true,
        data: response.data,
        message: 'Members imported successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to import members'
      };
    }
  },

  // Export members to CSV/Excel
  exportMembers: async (format = 'csv', filters = {}) => {
    if (USE_MOCK_DATA) {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock file download
      const filename = `members_export_${new Date().toISOString().split('T')[0]}.${format}`;
      const csvContent = `Name,Email,Phone,Department,Status,Membership Date
Brother Michael Adebayo,michael@gmail.com,+234 801 234 5678,Technical Unit,Active,2020-01-15
Sister Grace Okafor,grace@yahoo.com,+234 803 456 7890,Children Ministry,Active,2021-06-10
Brother David Ogundimu,david@hotmail.com,+234 805 678 9012,Finance Committee,Active,2019-03-20`;
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return mockResponse({ filename }, true, 'Members exported successfully');
    }

    try {
      const response = await apiClient.get('/members/export', {
        params: { format, ...filters },
        responseType: 'blob',
      });

      const filename = `members_export_${new Date().toISOString().split('T')[0]}.${format}`;
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
        message: 'Members exported successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to export members'
      };
    }
  }
};