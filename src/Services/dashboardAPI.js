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

export const dashboardAPI = {
  // Get dashboard statistics
  getStats: async () => {
    if (USE_MOCK_DATA) {
      const totalMembers = mockAuthData.members.length;
      const activeMembers = mockAuthData.members.filter(m => m.isActive).length;
      const upcomingEvents = mockAuthData.events.filter(e => 
        new Date(e.date) >= new Date() && e.status === 'upcoming'
      ).length;
      const pendingCelebrations = mockAuthData.celebrations.filter(c => 
        c.status === 'pending'
      ).length;

      // Calculate this week's attendance (mock)
      const thisWeekStart = new Date();
      thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
      const thisWeekAttendance = mockAuthData.attendance.filter(a => 
        new Date(a.date) >= thisWeekStart
      ).reduce((sum, a) => sum + a.totalAttendance, 0);

      // Calculate this month's average attendance (mock)
      const thisMonthStart = new Date();
      thisMonthStart.setDate(1);
      const thisMonthAttendances = mockAuthData.attendance.filter(a => 
        new Date(a.date) >= thisMonthStart
      );
      const thisMonthAttendance = thisMonthAttendances.length > 0 
        ? Math.round(thisMonthAttendances.reduce((sum, a) => sum + a.totalAttendance, 0) / thisMonthAttendances.length)
        : 0;

      return mockResponse({
        totalMembers,
        activeMembers,
        upcomingEvents,
        pendingCelebrations,
        thisWeekAttendance,
        thisMonthAttendance
      });
    }

    try {
      const response = await apiClient.get('/dashboard/stats');
      return {
        success: true,
        data: response.data,
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
    if (USE_MOCK_DATA) {
      const activities = [
        {
          description: 'New member Brother Michael Adebayo joined',
          icon: 'ri-user-add-line',
          iconBg: 'bg-green-100 text-green-600',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          description: 'Sunday service attendance recorded (285 people)',
          icon: 'ri-calendar-check-line',
          iconBg: 'bg-blue-100 text-blue-600',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          description: 'Youth Conference 2025 event created',
          icon: 'ri-calendar-event-line',
          iconBg: 'bg-purple-100 text-purple-600',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          description: 'Birthday celebration approved for Sister Grace',
          icon: 'ri-cake-3-line',
          iconBg: 'bg-yellow-100 text-yellow-600',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          description: 'Marriage seminar registration opened',
          icon: 'ri-heart-line',
          iconBg: 'bg-red-100 text-red-600',
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      return mockResponse(activities);
    }

    try {
      const response = await apiClient.get('/dashboard/recent-activities');
      return {
        success: true,
        data: response.data,
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
    if (USE_MOCK_DATA) {
      const upcomingEvents = mockAuthData.events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);

      return mockResponse(upcomingEvents);
    }

    try {
      const response = await apiClient.get(`/dashboard/upcoming-events?limit=${limit}`);
      return {
        success: true,
        data: response.data,
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
          startDate = new Date(now.setDate(now.getDate() - 7));
      }

      const attendanceData = mockAuthData.attendance
        .filter(a => new Date(a.date) >= startDate)
        .map(a => ({
          date: a.date,
          total: a.totalAttendance,
          visitors: a.visitors,
          members: a.totalAttendance - a.visitors
        }));

      const summary = {
        period,
        total: attendanceData.reduce((sum, a) => sum + a.total, 0),
        average: attendanceData.length > 0 ? Math.round(attendanceData.reduce((sum, a) => sum + a.total, 0) / attendanceData.length) : 0,
        data: attendanceData
      };

      return mockResponse(summary);
    }

    try {
      const response = await apiClient.get(`/dashboard/attendance-summary?period=${period}`);
      return {
        success: true,
        data: response.data,
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
    if (USE_MOCK_DATA) {
      // Generate mock growth data
      const months = [];
      const now = new Date();
      
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const memberCount = Math.floor(Math.random() * 50) + 200 + i * 5; // Simulated growth
        
        months.push({
          month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          members: memberCount,
          newMembers: Math.floor(Math.random() * 10) + 1
        });
      }

      return mockResponse({
        period,
        totalGrowth: months[months.length - 1].members - months[0].members,
        growthRate: ((months[months.length - 1].members - months[0].members) / months[0].members * 100).toFixed(1),
        data: months
      });
    }

    try {
      const response = await apiClient.get(`/dashboard/member-growth?period=${period}`);
      return {
        success: true,
        data: response.data,
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