import { useState, useEffect } from 'react';
import { celebrationFormService } from '../services/celebrationFormService';

const CelebrationForm = () => {
  const [formData, setFormData] = useState({
    celebrationType: '',
    name: '',
    phone: '',
    email: '',
    pictures: null,
    month: '',
    date: '',
    year: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slideInMessage, setSlideInMessage] = useState('');
  const [showSlideIn, setShowSlideIn] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [celebrationTypes, setCelebrationTypes] = useState([]);

  // Load celebration types on component mount
  useEffect(() => {
    setCelebrationTypes(celebrationFormService.getCelebrationTypes());
  }, []);

  // Update available dates when month changes
  useEffect(() => {
    if (formData.month) {
      const dates = celebrationFormService.getDateOptions(formData.month);
      setAvailableDates(dates);
    } else {
      setAvailableDates([]);
    }
  }, [formData.month]);

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Format as Nigerian number
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    }
    if (phoneNumber.length <= 6) {
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    }
    if (phoneNumber.length <= 10) {
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
    }
    
    // Format with country code
    return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 9)} ${phoneNumber.slice(9, 13)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Special handling for phone number
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Reset date when month changes
    if (name === 'month') {
      setFormData(prev => ({
        ...prev,
        date: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setErrors(prev => ({ ...prev, pictures: '' }));
    setSubmissionStatus('');

    if (files.length > 5) {
      setErrors(prev => ({
        ...prev,
        pictures: 'You can only upload a maximum of 5 files.'
      }));
      e.target.value = '';
      return;
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          pictures: `File type not allowed: ${file.name}. Please use JPG, PNG, GIF, or WebP.`
        }));
        e.target.value = '';
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          pictures: `File too large: ${file.name}. Maximum size is 5MB per file.`
        }));
        e.target.value = '';
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      pictures: files
    }));
  };

  const validateForm = () => {
    const validation = celebrationFormService.validateForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const resetForm = () => {
    setFormData({
      celebrationType: '',
      name: '',
      phone: '',
      email: '',
      pictures: null,
      month: '',
      date: '',
      year: '',
      message: ''
    });
    setErrors({});
    document.getElementById('pictures').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmissionStatus('Please correct the errors above and try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('Submitting your celebration request... Please wait.');
    setShowSlideIn(false);

    try {
      const response = await celebrationFormService.submitCelebration(formData);

      if (response.success) {
        setSubmissionStatus('');
        setSlideInMessage('🎉 Success! Your celebration request has been submitted. We will review it and contact you soon!');
        setShowSlideIn(true);
        
        // Auto-hide success message
        setTimeout(() => setShowSlideIn(false), 8000);
        
        // Reset form
        resetForm();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmissionStatus(response.message || 'Failed to submit your celebration request. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus(error.message || 'Network error. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors";
    const errorClass = "border-red-300 focus:border-red-500 focus:ring-red-100";
    const normalClass = "border-gray-300 focus:border-blue-600 focus:ring-blue-100";
    
    return `${baseClass} ${errors[fieldName] ? errorClass : normalClass}`;
  };

  const months = celebrationFormService.getMonthOptions();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🎉 Share Your Celebration! 🥂
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Tell us about your special moment so we can celebrate with you and give thanks to God!
          </p>
          <div className="bg-white p-4 rounded-lg shadow-sm border max-w-2xl mx-auto">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <i className="ri-shield-check-line text-green-600 mr-2"></i>
              <span>Your information is secure and will only be used for church celebrations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Celebration Type */}
              <div>
                <label htmlFor="celebrationType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Celebration *
                </label>
                <select 
                  className={getInputClassName('celebrationType')}
                  id="celebrationType" 
                  name="celebrationType" 
                  value={formData.celebrationType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Celebration Type</option>
                  {celebrationTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.celebrationType && (
                  <p className="text-red-600 text-sm mt-1">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.celebrationType}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  className={getInputClassName('name')}
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required 
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  className={getInputClassName('phone')}
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., 080 123 4567"
                  required
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.phone}
                  </p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  <i className="ri-information-line mr-1"></i>
                  We'll use this to contact you about your celebration
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (Optional)
                </label>
                <input 
                  type="email" 
                  className={getInputClassName('email')}
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Pictures Upload */}
              <div>
                <label htmlFor="pictures" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Pictures (Max 5) *
                </label>
                <input 
                  type="file" 
                  className={getInputClassName('pictures')}
                  id="pictures" 
                  name="pictures[]" 
                  multiple 
                  accept="image/*" 
                  onChange={handleFileChange}
                  required 
                />
                <div className="text-xs text-gray-500 mt-2">
                  <i className="ri-information-line mr-1"></i>
                  Accepted formats: JPG, PNG, GIF, WebP. Max 5MB per file. At least one picture required.
                </div>
                {errors.pictures && (
                  <p className="text-red-600 text-sm mt-2">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.pictures}
                  </p>
                )}
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                    Month *
                  </label>
                  <select 
                    className={getInputClassName('month')}
                    id="month" 
                    name="month" 
                    value={formData.month}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Month</option>
                    {months.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  {errors.month && (
                    <p className="text-red-600 text-xs mt-1">{errors.month}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <select 
                    className={getInputClassName('date')}
                    id="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleInputChange}
                    disabled={!formData.month}
                    required
                  >
                    <option value="" disabled>Select Date</option>
                    {availableDates.map(date => (
                      <option key={date.value} value={date.value}>
                        {date.value}{date.suffix}
                      </option>
                    ))}
                  </select>
                  {errors.date && (
                    <p className="text-red-600 text-xs mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Year (Optional)
                  </label>
                  <input 
                    type="number" 
                    className={getInputClassName('year')}
                    id="year" 
                    name="year" 
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder={new Date().getFullYear()}
                    min="1900"
                    max="2100"
                  />
                  {errors.year && (
                    <p className="text-red-600 text-xs mt-1">{errors.year}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea 
                  className={getInputClassName('message')}
                  id="message" 
                  name="message" 
                  rows="4" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any special message or details you'd like to share about your celebration..."
                  maxLength="1000"
                ></textarea>
                <div className="text-xs text-gray-500 mt-1 flex justify-between">
                  <span>Share any special details about your celebration</span>
                  <span>{formData.message.length}/1000</span>
                </div>
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submission Status */}
              {submissionStatus && (
                <div className={`p-4 rounded-lg border ${
                  submissionStatus.includes('correct the errors') 
                    ? 'bg-red-50 text-red-800 border-red-200' 
                    : submissionStatus.includes('Submitting') 
                    ? 'bg-blue-50 text-blue-800 border-blue-200' 
                    : 'bg-yellow-50 text-yellow-800 border-yellow-200'
                }`}>
                  <div className="flex items-center">
                    <i className={`mr-2 ${
                      submissionStatus.includes('Submitting') 
                        ? 'ri-loader-4-line animate-spin' 
                        : 'ri-information-line'
                    }`}></i>
                    {submissionStatus}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-bold py-4 px-6 rounded-lg text-lg transition-all transform ${
                  isSubmitting 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Submitting Your Celebration...
                  </span>
                ) : (
                  '🎉 Submit My Celebration 🎉'
                )}
              </button>

              <div className="text-center text-sm text-gray-500">
                <p>
                  <i className="ri-shield-check-line mr-1"></i>
                  Your information is safe and will only be used for church celebrations.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
            <p className="text-gray-600">
              Here's what you can expect after submitting your celebration request.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-eye-line text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Review</h3>
              <p className="text-gray-600 text-sm">
                Our team will review your submission within 24-48 hours to ensure it meets our guidelines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-green-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Contact You</h3>
              <p className="text-gray-600 text-sm">
                We'll reach out via phone or email to confirm details and timing for your celebration acknowledgment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-fill text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Celebrate!</h3>
              <p className="text-gray-600 text-sm">
                Join us for service as we celebrate your special moment together and give thanks to God!
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <i className="ri-lightbulb-line text-yellow-600 text-xl mr-3 mt-1"></i>
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800 mb-2">Tips for Your Submission:</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Choose clear, high-quality photos that represent your celebration well</li>
                  <li>• Provide your correct phone number so we can reach you easily</li>
                  <li>• Submit at least one week before you'd like the acknowledgment</li>
                  <li>• Include any specific details in the message field that might be helpful</li>
                  <li>• Make sure your celebration aligns with our church values and guidelines</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Slide-in Message */}
      <div 
        className={`fixed top-5 right-5 transition-all duration-500 ease-in-out z-50 ${
          showSlideIn ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-96'
        }`}
      >
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
          <div className="flex items-start">
            <i className="ri-check-circle-fill text-green-600 text-xl mr-3 mt-1"></i>
            <div className="flex-1">
              <p className="text-green-800 font-medium text-sm">{slideInMessage}</p>
            </div>
            <button 
              onClick={() => setShowSlideIn(false)}
              className="text-green-600 hover:text-green-800 ml-2"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationForm;