import { apiClient } from './apiClient';
import { mockAuthData } from '@/data/mockAuthData';

// Mock mode flag - set to false for production
const USE_MOCK_DATA = true;

// Helper function for mock responses
const mockResponse = (data, success = true, message = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success, data, message });
    }, 700);
  });
};

export const eventsAPI = {
  // Get all events
  getEvents: async (filters = {}) => {
    if (USE_MOCK_DATA) {
      let filteredEvents = [...mockAuthData.events];

      // Apply filters
      if (filters.status) {
        filteredEvents = filteredEvents.filter(event => 
          event.status === filters.status
        );
      }

      if (filters.category) {
        filteredEvents = filteredEvents.filter(event =>
          event.category === filters.category
        );
      }

      if (filters.startDate || filters.endDate) {
        filteredEvents = filteredEvents.filter(event => {
          const eventDate = new Date(event.date);
          const matchesStart = !filters.startDate || eventDate >= new Date(filters.startDate);
          const matchesEnd = !filters.endDate || eventDate <= new Date(filters.endDate);
          return matchesStart && matchesEnd;
        });
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm)
        );
      }

      // Sort by date (upcoming first)
      filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

      return mockResponse(filteredEvents, true, 'Events retrieved successfully');
    }

    try {
      const response = await apiClient.get('/events', { params: filters });
      return {
        success: true,
        data: response.data,
        message: 'Events retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch events'
      };
    }
  },

  // Get event by ID
  getEventById: async (id) => {
    if (USE_MOCK_DATA) {
      const event = mockAuthData.events.find(e => e.id === id);
      if (event) {
        return mockResponse(event, true, 'Event details retrieved successfully');
      } else {
        return mockResponse(null, false, 'Event not found');
      }
    }

    try {
      const response = await apiClient.get(`/events/${id}`);
      return {
        success: true,
        data: response.data,
        message: 'Event details retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch event details'
      };
    }
  },

  // Create new event
  createEvent: async (eventData) => {
    if (USE_MOCK_DATA) {
      const newEvent = mockAuthData.addEvent(eventData);
      return mockResponse(newEvent, true, 'Event created successfully');
    }

    try {
      const response = await apiClient.post('/events', eventData);
      return {
        success: true,
        data: response.data,
        message: 'Event created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create event'
      };
    }
  },

  // Update event
  updateEvent: async (id, eventData) => {
    if (USE_MOCK_DATA) {
      const updatedEvent = mockAuthData.updateEvent(id, eventData);
      if (updatedEvent) {
        return mockResponse(updatedEvent, true, 'Event updated successfully');
      } else {
        return mockResponse(null, false, 'Event not found');
      }
    }

    try {
      const response = await apiClient.put(`/events/${id}`, eventData);
      return {
        success: true,
        data: response.data,
        message: 'Event updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update event'
      };
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    if (USE_MOCK_DATA) {
      const deleted = mockAuthData.deleteEvent(id);
      if (deleted) {
        return mockResponse({}, true, 'Event deleted successfully');
      } else {
        return mockResponse(null, false, 'Event not found');
      }
    }

    try {
      await apiClient.delete(`/events/${id}`);
      return {
        success: true,
        message: 'Event deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete event'
      };
    }
  },

  // Get event categories
  getEventCategories: async () => {
    if (USE_MOCK_DATA) {
      const categories = [
        'Service',
        'Conference',
        'Seminar',
        'Workshop',
        'Outreach',
        'Fellowship',
        'Youth Event',
        'Children Event',
        'Prayer Meeting',
        'Special Program',
        'Other'
      ];

      return mockResponse(categories, true, 'Categories retrieved successfully');
    }

    try {
      const response = await apiClient.get('/events/categories');
      return {
        success: true,
        data: response.data,
        message: 'Categories retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch categories'
      };
    }
  },

  // Get events statistics
  getEventsStats: async () => {
    if (USE_MOCK_DATA) {
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const upcomingEvents = mockAuthData.events.filter(e => 
        new Date(e.date) >= now && e.status === 'upcoming'
      ).length;
      
      const completedEvents = mockAuthData.events.filter(e => 
        e.status === 'completed'
      ).length;
      
      const thisMonthEvents = mockAuthData.events.filter(e => 
        new Date(e.date) >= thisMonth && new Date(e.date) < new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 1)
      ).length;

      // Category breakdown
      const categoryStats = {};
      mockAuthData.events.forEach(event => {
        categoryStats[event.category] = (categoryStats[event.category] || 0) + 1;
      });

      // Status breakdown
      const statusStats = {
        upcoming: mockAuthData.events.filter(e => e.status === 'upcoming').length,
        ongoing: mockAuthData.events.filter(e => e.status === 'ongoing').length,
        completed: mockAuthData.events.filter(e => e.status === 'completed').length,
        cancelled: mockAuthData.events.filter(e => e.status === 'cancelled').length
      };

      const stats = {
        totalEvents: mockAuthData.events.length,
        upcomingEvents,
        completedEvents,
        thisMonthEvents,
        categoryStats,
        statusStats,
        averageAttendees: Math.round(
          mockAuthData.events.reduce((sum, e) => sum + (e.currentAttendees || 0), 0) / mockAuthData.events.length
        )
      };

      return mockResponse(stats, true, 'Events statistics retrieved successfully');
    }

    try {
      const response = await apiClient.get('/events/stats');
      return {
        success: true,
        data: response.data,
        message: 'Events statistics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch events statistics'
      };
    }
  },

  // Update event attendance
  updateEventAttendance: async (id, attendanceCount) => {
    if (USE_MOCK_DATA) {
      const event = mockAuthData.events.find(e => e.id === id);
      if (event) {
        event.currentAttendees = attendanceCount;
        event.updatedAt = new Date().toISOString();
        return mockResponse(event, true, 'Event attendance updated successfully');
      } else {
        return mockResponse(null, false, 'Event not found');
      }
    }

    try {
      const response = await apiClient.patch(`/events/${id}/attendance`, {
        attendanceCount: attendanceCount
      });
      return {
        success: true,
        data: response.data,
        message: 'Event attendance updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update event attendance'
      };
    }
  },

  // Get upcoming events for calendar
  getUpcomingEvents: async (limit = 10) => {
    if (USE_MOCK_DATA) {
      const upcomingEvents = mockAuthData.events
        .filter(event => new Date(event.date) >= new Date() && event.status === 'upcoming')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);

      return mockResponse(upcomingEvents, true, 'Upcoming events retrieved successfully');
    }

    try {
      const response = await apiClient.get(`/events/upcoming?limit=${limit}`);
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

  // Export events
  exportEvents: async (format = 'csv', filters = {}) => {
    if (USE_MOCK_DATA) {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Filter events based on filters
      let eventsToExport = mockAuthData.events;
      
      if (filters.status) {
        eventsToExport = eventsToExport.filter(e => e.status === filters.status);
      }
      
      if (filters.category) {
        eventsToExport = eventsToExport.filter(e => e.category === filters.category);
      }

      // Mock CSV generation
      const csvContent = `Title,Description,Date,Time,Location,Category,Status,Organizer,Max Attendees,Current Attendees
${eventsToExport.map(event => 
        `"${event.title}","${event.description}",${event.date},${event.time},${event.location},${event.category},${event.status},${event.organizer},${event.maxAttendees || 'No Limit'},${event.currentAttendees || 0}`
      ).join('\n')}`;

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `events_export_${new Date().toISOString().split('T')[0]}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return mockResponse({ 
        filename: `events_export_${new Date().toISOString().split('T')[0]}.${format}`,
        count: eventsToExport.length 
      }, true, 'Events exported successfully');
    }

    try {
      const response = await apiClient.get('/events/export', {
        params: { format, ...filters },
        responseType: 'blob'
      });

      const filename = `events_export_${new Date().toISOString().split('T')[0]}.${format}`;
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
        message: 'Events exported successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to export events'
      };
    }
  },

  // Duplicate event
  duplicateEvent: async (id) => {
    if (USE_MOCK_DATA) {
      const originalEvent = mockAuthData.events.find(e => e.id === id);
      if (originalEvent) {
        const duplicatedEvent = {
          ...originalEvent,
          title: `${originalEvent.title} (Copy)`,
          date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // Next week
          status: 'upcoming',
          currentAttendees: 0
        };
        
        const newEvent = mockAuthData.addEvent(duplicatedEvent);
        return mockResponse(newEvent, true, 'Event duplicated successfully');
      } else {
        return mockResponse(null, false, 'Event not found');
      }
    }

    try {
      const response = await apiClient.post(`/events/${id}/duplicate`);
      return {
        success: true,
        data: response.data,
        message: 'Event duplicated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to duplicate event'
      };
    }
  }
};