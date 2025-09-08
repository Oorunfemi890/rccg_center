import { apiClient } from './apiClient';
import { mockAuthData } from '@/data/mockAuthData';

// Mock mode flag - set to false for production
const USE_MOCK_DATA = true;

// Helper function for mock responses
const mockResponse = (data, success = true, message = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success, data, message });
    }, 600);
  });
};

export const attendanceAPI = {
  // Get all attendance records
  getAttendanceRecords: async (filters = {}) => {
    if (USE_MOCK_DATA) {
      let filteredAttendance = [...mockAuthData.attendance];

      // Apply date range filter
      if (filters.startDate || filters.endDate) {
        filteredAttendance = filteredAttendance.filter(record => {
          const recordDate = new Date(record.date);
          const matchesStart = !filters.startDate || recordDate >= new Date(filters.startDate);
          const matchesEnd = !filters.endDate || recordDate <= new Date(filters.endDate);
          return matchesStart && matchesEnd;
        });
      }

      // Apply service type filter
      if (filters.serviceType && filters.serviceType !== 'all') {
        filteredAttendance = filteredAttendance.filter(record => 
          record.serviceType === filters.serviceType
        );
      }

      // Sort by date (newest first)
      filteredAttendance.sort((a, b) => new Date(b.date) - new Date(a.date));

      return mockResponse(filteredAttendance, true, 'Attendance records retrieved successfully');
    }

    try {
      const response = await apiClient.get('/attendance', { params: filters });
      return {
        success: true,
        data: response.data,
        message: 'Attendance records retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch attendance records'
      };
    }
  },

  // Get attendance record by ID
  getAttendanceById: async (id) => {
    if (USE_MOCK_DATA) {
      const record = mockAuthData.attendance.find(a => a.id === id);
      if (record) {
        return mockResponse(record, true, 'Attendance record retrieved successfully');
      } else {
        return mockResponse(null, false, 'Attendance record not found');
      }
    }

    try {
      const response = await apiClient.get(`/attendance/${id}`);
      return {
        success: true,
        data: response.data,
        message: 'Attendance record retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch attendance record'
      };
    }
  },

  // Create new attendance record
  createAttendance: async (attendanceData) => {
    if (USE_MOCK_DATA) {
      const newAttendance = mockAuthData.addAttendance(attendanceData);
      return mockResponse(newAttendance, true, 'Attendance recorded successfully');
    }

    try {
      const response = await apiClient.post('/attendance', attendanceData);
      return {
        success: true,
        data: response.data,
        message: 'Attendance recorded successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to record attendance'
      };
    }
  },

  // Update attendance record
  updateAttendance: async (id, attendanceData) => {
    if (USE_MOCK_DATA) {
      const index = mockAuthData.attendance.findIndex(a => a.id === id);
      if (index !== -1) {
        mockAuthData.attendance[index] = {
          ...mockAuthData.attendance[index],
          ...attendanceData,
          updatedAt: new Date().toISOString()
        };
        return mockResponse(mockAuthData.attendance[index], true, 'Attendance updated successfully');
      } else {
        return mockResponse(null, false, 'Attendance record not found');
      }
    }

    try {
      const response = await apiClient.put(`/attendance/${id}`, attendanceData);
      return {
        success: true,
        data: response.data,
        message: 'Attendance updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update attendance'
      };
    }
  },

  // Delete attendance record
  deleteAttendance: async (id) => {
    if (USE_MOCK_DATA) {
      const index = mockAuthData.attendance.findIndex(a => a.id === id);
      if (index !== -1) {
        mockAuthData.attendance.splice(index, 1);
        return mockResponse({}, true, 'Attendance record deleted successfully');
      } else {
        return mockResponse(null, false, 'Attendance record not found');
      }
    }

    try {
      await apiClient.delete(`/attendance/${id}`);
      return {
        success: true,
        message: 'Attendance record deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete attendance record'
      };
    }
  },

  // Get attendance statistics
  getAttendanceStats: async (period = 'month') => {
    if (USE_MOCK_DATA) {
      let startDate;
      const now = new Date();

      switch (period) {
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = new Date(now.setMonth(now.getMonth() - 1));
      }

      const periodAttendance = mockAuthData.attendance.filter(a => 
        new Date(a.date) >= startDate
      );

      const totalAttendance = periodAttendance.reduce((sum, a) => sum + a.totalAttendance, 0);
      const averageAttendance = periodAttendance.length > 0 
        ? Math.round(totalAttendance / periodAttendance.length) 
        : 0;

      // Calculate growth rate (mock)
      const previousPeriodAttendance = mockAuthData.attendance.filter(a => {
        const date = new Date(a.date);
        const previousStart = new Date(startDate);
        previousStart.setDate(previousStart.getDate() - (period === 'week' ? 7 : period === 'month' ? 30 : 365));
        return date >= previousStart && date < startDate;
      });

      const previousTotal = previousPeriodAttendance.reduce((sum, a) => sum + a.totalAttendance, 0);
      const previousAverage = previousPeriodAttendance.length > 0 
        ? Math.round(previousTotal / previousPeriodAttendance.length) 
        : 0;

      const growthRate = previousAverage > 0 
        ? ((averageAttendance - previousAverage) / previousAverage * 100).toFixed(1)
        : 0;

      const stats = {
        period,
        totalRecords: periodAttendance.length,
        totalAttendance,
        averageAttendance,
        growthRate: parseFloat(growthRate),
        highestAttendance: periodAttendance.length > 0 
          ? Math.max(...periodAttendance.map(a => a.totalAttendance)) 
          : 0,
        lowestAttendance: periodAttendance.length > 0 
          ? Math.min(...periodAttendance.map(a => a.totalAttendance)) 
          : 0,
        byServiceType: periodAttendance.reduce((acc, a) => {
          acc[a.serviceType] = (acc[a.serviceType] || 0) + a.totalAttendance;
          return acc;
        }, {})
      };

      return mockResponse(stats, true, 'Attendance statistics retrieved successfully');
    }

    try {
      const response = await apiClient.get(`/attendance/stats?period=${period}`);
      return {
        success: true,
        data: response.data,
        message: 'Attendance statistics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch attendance statistics'
      };
    }
  },

  // Get service types
  getServiceTypes: async () => {
    if (USE_MOCK_DATA) {
      const serviceTypes = [
        'Sunday Fire Service',
        'Sunday School',
        'Sunday Main Service',
        'Tuesday Bible Study',
        'Wednesday Prayer',
        'Thursday Faith Clinic',
        'Friday Night Service',
        'Holy Ghost Service',
        'Special Program'
      ];

      return mockResponse(serviceTypes, true, 'Service types retrieved successfully');
    }

    try {
      const response = await apiClient.get('/attendance/service-types');
      return {
        success: true,
        data: response.data,
        message: 'Service types retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch service types'
      };
    }
  },

  // Get members for attendance marking
  getMembersForAttendance: async () => {
    if (USE_MOCK_DATA) {
      const members = mockAuthData.members
        .filter(member => member.isActive)
        .map(member => ({
          id: member.id,
          name: member.name,
          department: member.department
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      return mockResponse(members, true, 'Members retrieved successfully');
    }

    try {
      const response = await apiClient.get('/attendance/members');
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

  // Generate attendance report
  generateReport: async (filters = {}) => {
    if (USE_MOCK_DATA) {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const reportData = {
        period: filters.period || 'month',
        startDate: filters.startDate,
        endDate: filters.endDate,
        serviceType: filters.serviceType || 'all',
        records: mockAuthData.attendance.filter(record => {
          const recordDate = new Date(record.date);
          const matchesDateRange = (!filters.startDate || recordDate >= new Date(filters.startDate)) &&
                                  (!filters.endDate || recordDate <= new Date(filters.endDate));
          const matchesServiceType = !filters.serviceType || filters.serviceType === 'all' || record.serviceType === filters.serviceType;
          return matchesDateRange && matchesServiceType;
        }),
        summary: {
          totalRecords: 5,
          totalAttendance: 1247,
          averageAttendance: 249,
          highestAttendance: 285,
          lowestAttendance: 67
        }
      };

      // Mock CSV generation
      const csvContent = `Date,Service Type,Total Attendance,Adults,Youth,Children,Visitors,Recorded By
${reportData.records.map(record => 
        `${record.date},${record.serviceType},${record.totalAttendance},${record.adults},${record.youth},${record.children},${record.visitors},${record.recordedBy}`
      ).join('\n')}`;

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return mockResponse(reportData, true, 'Report generated successfully');
    }

    try {
      const response = await apiClient.post('/attendance/report', filters, {
        responseType: 'blob'
      });

      const filename = `attendance_report_${new Date().toISOString().split('T')[0]}.csv`;
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
        message: 'Report generated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to generate report'
      };
    }
  }
};