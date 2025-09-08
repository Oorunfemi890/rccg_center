// Mock data for testing authentication and admin features
export const mockAuthData = {
  admins: [
    {
      id: '1',
      name: 'Pastor John Doe',
      email: 'admin@rccglcc.org',
      password: 'admin123', // In production, this would be hashed
      role: 'super_admin',
      phone: '+234 803 331 7762',
      avatar: '/img/WhatsApp Image 2025-01-15 at 13.59.55.jpeg',
      position: 'Senior Pastor',
      permissions: ['all'],
      isActive: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2025-01-15T00:00:00.000Z',
      lastLogin: '2025-01-15T10:30:00.000Z'
    },
    {
      id: '2',
      name: 'Minister Sarah Johnson',
      email: 'sarah@rccglcc.org',
      password: 'sarah123',
      role: 'admin',
      phone: '+234 802 123 4567',
      avatar: null,
      position: 'Assistant Pastor',
      permissions: ['members', 'events', 'attendance', 'celebrations'],
      isActive: true,
      createdAt: '2024-06-01T00:00:00.000Z',
      updatedAt: '2025-01-10T00:00:00.000Z',
      lastLogin: '2025-01-14T15:20:00.000Z'
    }
  ],

  // Generate mock JWT token
  generateToken: () => {
    const adminId = mockAuthData.admins[0].id;
    return `mock_token_${adminId}_${Date.now()}`;
  },

  // Generate mock refresh token
  generateRefreshToken: () => {
    const adminId = mockAuthData.admins[0].id;
    return `mock_refresh_${adminId}_${Date.now()}`;
  },

  // Mock members data
  members: [
    {
      id: '1',
      name: 'Brother Michael Adebayo',
      email: 'michael@gmail.com',
      phone: '+234 801 234 5678',
      address: '15 Victoria Street, Lekki, Lagos',
      dateOfBirth: '1985-03-15',
      gender: 'Male',
      maritalStatus: 'Married',
      occupation: 'Software Engineer',
      department: 'Technical Unit',
      membershipDate: '2020-01-15',
      isActive: true,
      emergencyContact: {
        name: 'Mrs. Adebayo',
        phone: '+234 802 345 6789',
        relationship: 'Wife'
      },
      avatar: null,
      createdAt: '2020-01-15T00:00:00.000Z',
      updatedAt: '2024-12-01T00:00:00.000Z'
    },
    {
      id: '2',
      name: 'Sister Grace Okafor',
      email: 'grace@yahoo.com',
      phone: '+234 803 456 7890',
      address: '22 Allen Avenue, Ikeja, Lagos',
      dateOfBirth: '1990-08-22',
      gender: 'Female',
      maritalStatus: 'Single',
      occupation: 'Teacher',
      department: 'Children Ministry',
      membershipDate: '2021-06-10',
      isActive: true,
      emergencyContact: {
        name: 'Mr. Okafor',
        phone: '+234 804 567 8901',
        relationship: 'Father'
      },
      avatar: null,
      createdAt: '2021-06-10T00:00:00.000Z',
      updatedAt: '2024-11-15T00:00:00.000Z'
    },
    {
      id: '3',
      name: 'Brother David Ogundimu',
      email: 'david@hotmail.com',
      phone: '+234 805 678 9012',
      address: '8 Admiralty Way, Lekki Phase 1, Lagos',
      dateOfBirth: '1978-12-05',
      gender: 'Male',
      maritalStatus: 'Married',
      occupation: 'Business Owner',
      department: 'Finance Committee',
      membershipDate: '2019-03-20',
      isActive: true,
      emergencyContact: {
        name: 'Mrs. Ogundimu',
        phone: '+234 806 789 0123',
        relationship: 'Wife'
      },
      avatar: null,
      createdAt: '2019-03-20T00:00:00.000Z',
      updatedAt: '2024-10-30T00:00:00.000Z'
    }
  ],

  // Mock attendance data
  attendance: [
    {
      id: '1',
      date: '2025-01-12',
      serviceType: 'Sunday Service',
      totalAttendance: 285,
      members: [
        { memberId: '1', name: 'Brother Michael Adebayo', present: true, timeArrived: '08:45' },
        { memberId: '2', name: 'Sister Grace Okafor', present: true, timeArrived: '09:15' },
        { memberId: '3', name: 'Brother David Ogundimu', present: false, timeArrived: null }
      ],
      visitors: 45,
      children: 67,
      youth: 89,
      adults: 129,
      createdAt: '2025-01-12T10:00:00.000Z',
      recordedBy: 'Sarah Johnson'
    },
    {
      id: '2',
      date: '2025-01-09',
      serviceType: 'Thursday Faith Clinic',
      totalAttendance: 67,
      members: [
        { memberId: '1', name: 'Brother Michael Adebayo', present: true, timeArrived: '18:00' },
        { memberId: '2', name: 'Sister Grace Okafor', present: true, timeArrived: '18:10' },
        { memberId: '3', name: 'Brother David Ogundimu', present: true, timeArrived: '18:05' }
      ],
      visitors: 12,
      children: 15,
      youth: 20,
      adults: 32,
      createdAt: '2025-01-09T18:30:00.000Z',
      recordedBy: 'Pastor John Doe'
    }
  ],

  // Mock events data
  events: [
    {
      id: '1',
      title: 'Holy Ghost Service',
      description: 'Monthly power-packed service with supernatural encounters, divine healing, and spiritual breakthrough.',
      date: '2025-02-07',
      time: '19:00',
      endTime: '21:00',
      location: 'Main Auditorium',
      category: 'Service',
      isRecurring: true,
      recurringPattern: 'monthly',
      organizer: 'Pastor John Doe',
      maxAttendees: 500,
      currentAttendees: 0,
      image: '/img/holy-ghost-service.jpg',
      status: 'upcoming',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      title: 'Youth Conference 2025',
      description: 'Annual youth conference focused on purpose, passion, and divine destiny. Join us for 3 days of impactful sessions.',
      date: '2025-03-15',
      time: '09:00',
      endTime: '17:00',
      location: 'Church Grounds',
      category: 'Conference',
      isRecurring: false,
      recurringPattern: null,
      organizer: 'Youth Ministry',
      maxAttendees: 300,
      currentAttendees: 85,
      image: '/img/youth-conference.jpg',
      status: 'upcoming',
      createdAt: '2025-01-10T00:00:00.000Z',
      updatedAt: '2025-01-14T00:00:00.000Z'
    },
    {
      id: '3',
      title: 'Marriage Seminar',
      description: 'Building strong Christian marriages - A seminar for couples and intending couples.',
      date: '2025-02-22',
      time: '10:00',
      endTime: '16:00',
      location: 'Conference Hall',
      category: 'Seminar',
      isRecurring: false,
      recurringPattern: null,
      organizer: 'Family Ministry',
      maxAttendees: 100,
      currentAttendees: 42,
      image: '/img/marriage-seminar.jpg',
      status: 'upcoming',
      createdAt: '2025-01-08T00:00:00.000Z',
      updatedAt: '2025-01-12T00:00:00.000Z'
    }
  ],

  // Mock celebrations data
  celebrations: [
    {
      id: '1',
      type: 'Birthday',
      name: 'Brother Michael Adebayo',
      memberId: '1',
      phone: '+234 801 234 5678',
      message: 'Thank God for another year of life and His faithfulness!',
      month: '3',
      date: '15',
      pictures: ['/img/celebrations/michael-birthday.jpg'],
      status: 'approved',
      acknowledgedDate: '2025-01-15',
      createdAt: '2025-01-10T00:00:00.000Z',
      updatedAt: '2025-01-15T00:00:00.000Z'
    },
    {
      id: '2',
      type: 'Wedding Anniversary',
      name: 'Brother & Sister David Ogundimu',
      memberId: '3',
      phone: '+234 805 678 9012',
      message: '15 years of God\'s faithfulness in our marriage. To God be the glory!',
      month: '2',
      date: '14',
      pictures: ['/img/celebrations/david-anniversary.jpg', '/img/celebrations/david-anniversary2.jpg'],
      status: 'pending',
      acknowledgedDate: null,
      createdAt: '2025-01-12T00:00:00.000Z',
      updatedAt: '2025-01-12T00:00:00.000Z'
    },
    {
      id: '3',
      type: 'Graduation',
      name: 'Sister Grace Okafor',
      memberId: '2',
      phone: '+234 803 456 7890',
      message: 'Completed my Master\'s degree in Education. Thank you Lord!',
      month: '1',
      date: '20',
      pictures: ['/img/celebrations/grace-graduation.jpg'],
      status: 'approved',
      acknowledgedDate: '2025-01-20',
      createdAt: '2025-01-18T00:00:00.000Z',
      updatedAt: '2025-01-20T00:00:00.000Z'
    }
  ],

  // Helper functions to manipulate mock data
  addMember: (member) => {
    const newMember = {
      ...member,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockAuthData.members.push(newMember);
    return newMember;
  },

  updateMember: (id, updates) => {
    const index = mockAuthData.members.findIndex(m => m.id === id);
    if (index !== -1) {
      mockAuthData.members[index] = {
        ...mockAuthData.members[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return mockAuthData.members[index];
    }
    return null;
  },

  addAttendance: (attendance) => {
    const newAttendance = {
      ...attendance,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    mockAuthData.attendance.push(newAttendance);
    return newAttendance;
  },

  addEvent: (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockAuthData.events.push(newEvent);
    return newEvent;
  },

  updateEvent: (id, updates) => {
    const index = mockAuthData.events.findIndex(e => e.id === id);
    if (index !== -1) {
      mockAuthData.events[index] = {
        ...mockAuthData.events[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return mockAuthData.events[index];
    }
    return null;
  },

  deleteEvent: (id) => {
    const index = mockAuthData.events.findIndex(e => e.id === id);
    if (index !== -1) {
      mockAuthData.events.splice(index, 1);
      return true;
    }
    return false;
  },

  addCelebration: (celebration) => {
    const newCelebration = {
      ...celebration,
      id: Date.now().toString(),
      status: 'pending',
      acknowledgedDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockAuthData.celebrations.push(newCelebration);
    return newCelebration;
  },

  updateCelebration: (id, updates) => {
    const index = mockAuthData.celebrations.findIndex(c => c.id === id);
    if (index !== -1) {
      mockAuthData.celebrations[index] = {
        ...mockAuthData.celebrations[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return mockAuthData.celebrations[index];
    }
    return null;
  }
};