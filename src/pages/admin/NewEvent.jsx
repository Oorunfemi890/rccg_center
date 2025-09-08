import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '@/services/eventsAPI';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

const NewEvent = () => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    category: '',
    maxAttendees: '',
    isRecurring: false,
    recurringPattern: '',
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const eventCategories = [
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

  const recurringPatterns = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        e.target.value = '';
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        e.target.value = '';
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else if (new Date(formData.date) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.date = 'Event date cannot be in the past';
    }

    if (!formData.time) {
      newErrors.time = 'Start time is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Event location is required';
    }

    if (!formData.category) {
      newErrors.category = 'Event category is required';
    }

    // Time validation
    if (formData.time && formData.endTime) {
      const startTime = new Date(`2000-01-01T${formData.time}`);
      const endTime = new Date(`2000-01-01T${formData.endTime}`);
      
      if (endTime <= startTime) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    // Max attendees validation
    if (formData.maxAttendees && (parseInt(formData.maxAttendees) < 1 || parseInt(formData.maxAttendees) > 10000)) {
      newErrors.maxAttendees = 'Max attendees must be between 1 and 10,000';
    }

    // Recurring pattern validation
    if (formData.isRecurring && !formData.recurringPattern) {
      newErrors.recurringPattern = 'Please select a recurring pattern';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    try {
      setLoading(true);

      const eventData = {
        ...formData,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
        organizer: admin?.name || 'Unknown',
        status: 'upcoming',
        currentAttendees: 0
      };

      // If there's an image, handle it appropriately
      if (formData.image) {
        // For mock data, we'll just use a placeholder URL
        // In production, you would upload the image to a server or cloud storage
        eventData.image = `/img/events/${formData.image.name}`;
      }

      const response = await eventsAPI.createEvent(eventData);

      if (response.success) {
        toast.success('Event created successfully!');
        navigate('/admin/events');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-1">Add a new event to your church calendar</p>
        </div>
        <button
          onClick={() => navigate('/admin/events')}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Back to Events
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the event, its purpose, and what attendees can expect..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  {eventCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Main Auditorium, Church Grounds"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.date ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.date}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.time ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.time}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.endTime ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.endTime}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Attendees
              </label>
              <input
                type="number"
                name="maxAttendees"
                value={formData.maxAttendees}
                onChange={handleInputChange}
                min="1"
                max="10000"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.maxAttendees ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Leave empty for no limit"
              />
              {errors.maxAttendees && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.maxAttendees}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                This is a recurring event
              </label>
            </div>

            {formData.isRecurring && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recurring Pattern *
                </label>
                <select
                  name="recurringPattern"
                  value={formData.recurringPattern}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.recurringPattern ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Pattern</option>
                  {recurringPatterns.map(pattern => (
                    <option key={pattern.value} value={pattern.value}>
                      {pattern.label}
                    </option>
                  ))}
                </select>
                {errors.recurringPattern && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.recurringPattern}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Event Image */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Image</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Recommended size: 800x400px. Maximum file size: 5MB.
              </p>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Event preview" 
                    className="w-48 h-24 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: null }));
                      // Clear file input
                      const fileInput = document.querySelector('input[type="file"]');
                      if (fileInput) fileInput.value = '';
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <i className="ri-close-line text-xs"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;