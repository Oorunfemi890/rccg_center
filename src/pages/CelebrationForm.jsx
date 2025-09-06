import { useState, useEffect } from 'react';

const CelebrationForm = () => {
  const [formData, setFormData] = useState({
    celebrationType: '',
    name: '',
    phone: '',
    pictures: null,
    month: '',
    date: '',
    message: ''
  });
  
  const [fileError, setFileError] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [slideInMessage, setSlideInMessage] = useState('');
  const [showSlideIn, setShowSlideIn] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);

  const daysInMonth = (month, year) => new Date(year || new Date().getFullYear(), month, 0).getDate();

  const populateDates = (selectedMonth) => {
    if (selectedMonth) {
      const numDays = daysInMonth(parseInt(selectedMonth));
      const dates = [];
      for (let i = 1; i <= numDays; i++) {
        dates.push(i);
      }
      setAvailableDates(dates);
    } else {
      setAvailableDates([]);
    }
  };

  useEffect(() => {
    populateDates(formData.month);
  }, [formData.month]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'month') {
      setFormData(prev => ({
        ...prev,
        date: '' // Reset date when month changes
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileError('');
    setSubmissionStatus('');

    if (files.length > 2) {
      setFileError('You can only upload a maximum of 2 files.');
      e.target.value = '';
      return;
    }

    for (const file of files) {
      if (!['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setFileError(`File type not allowed: ${file.name}. Please use PDF, JPG, PNG, or JPEG.`);
        e.target.value = '';
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      pictures: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileError('');

    // Client-side validation for required picture
    if (!formData.pictures || formData.pictures.length === 0) {
      setFileError('Please upload at least one picture.');
      return;
    }

    // Double-check file count
    if (formData.pictures.length > 2) {
      setFileError('You can only upload a maximum of 2 files.');
      return;
    }

    setSubmissionStatus('Submitting... Please wait.');
    setStatusType('info');
    setShowSlideIn(false);

    const submitFormData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'pictures' && formData.pictures) {
        for (let i = 0; i < formData.pictures.length; i++) {
          submitFormData.append('pictures[]', formData.pictures[i]);
        }
      } else if (key !== 'pictures') {
        submitFormData.append(key, formData[key]);
      }
    });

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmissionStatus('');
      setSlideInMessage('Successfully submitted! We will contact you soon.');
      setShowSlideIn(true);
      setTimeout(() => setShowSlideIn(false), 5000);
      
      // Reset form
      setFormData({
        celebrationType: '',
        name: '',
        phone: '',
        pictures: null,
        month: '',
        date: '',
        message: ''
      });
      setFileError('');
      document.getElementById('pictures').value = '';
      
    } catch (error) {
      setStatusType('danger');
      setSubmissionStatus(`Network Error: ${error.message || 'Could not connect to the server.'}`);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🎉 Share Your Celebration! 🥂</h1>
          <p className="text-lg text-gray-600">
            Tell us about your special moment so we can celebrate with you and give thanks to God!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              <div>
                <label htmlFor="celebrationType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Celebration *
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  id="celebrationType" 
                  name="celebrationType" 
                  value={formData.celebrationType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Type</option>
                  <option value="Birthday">Birthday 🎂</option>
                  <option value="Wedding Anniversary">Wedding Anniversary 💍</option>
                  <option value="Baby Dedications">Baby Dedications 👶</option>
                  <option value="Graduation">Graduation 🎓</option>
                  <option value="Career Milestone">Career Milestone 💼</option>
                  <option value="Special Achievement">Special Achievement 🏆</option>
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required 
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., +234 123 456 7890" 
                />
              </div>

              <div>
                <label htmlFor="pictures" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Pictures (Max 2) *
                </label>
                <input 
                  type="file" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  id="pictures" 
                  name="pictures[]" 
                  multiple 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={handleFileChange}
                  required 
                />
                <div className="text-xs text-gray-500 mt-2">
                  <i className="ri-information-line mr-1"></i>
                  Accepted formats: PDF, JPG, PNG, JPEG. At least one picture required.
                </div>
                {fileError && (
                  <div className="text-red-600 mt-2 text-sm">
                    <i className="ri-error-warning-line mr-1"></i>
                    {fileError}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                    Month *
                  </label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    id="month" 
                    name="month" 
                    value={formData.month}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    id="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleInputChange}
                    disabled={!formData.month}
                    required
                  >
                    <option value="" disabled>Select Date</option>
                    {availableDates.map(date => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  id="message" 
                  name="message" 
                  rows="3" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any special message or details you'd like to share..."
                ></textarea>
              </div>

              {submissionStatus && (
                <div className={`p-4 rounded-lg ${
                  statusType === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' : 
                  statusType === 'danger' ? 'bg-red-50 text-red-800 border border-red-200' : ''
                }`}>
                  <div className="flex items-center">
                    <i className={`mr-2 ${
                      statusType === 'info' ? 'ri-loader-4-line animate-spin' : 'ri-error-warning-line'
                    }`}></i>
                    {submissionStatus}
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={submissionStatus.includes('Submitting')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submissionStatus.includes('Submitting') ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Submitting...
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
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-check-line text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Review</h3>
              <p className="text-gray-600 text-sm">
                Our team will review your submission within 24-48 hours.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-green-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Contact You</h3>
              <p className="text-gray-600 text-sm">
                We'll reach out to confirm details and timing for your celebration.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-emotion-happy-line text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Celebrate!</h3>
              <p className="text-gray-600 text-sm">
                Join us for service as we celebrate your special moment together!
              </p>
            </div>
          </div>
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <i className="ri-lightbulb-line text-yellow-600 text-xl mr-3 mt-1"></i>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Tips for Your Submission:</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Choose clear, high-quality photos that represent your celebration well</li>
                  <li>• Provide your correct phone number so we can reach you</li>
                  <li>• Submit at least one week before you'd like the acknowledgment</li>
                  <li>• Include any specific details in the message field</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Slide-in Message */}
      <div 
        className={`fixed top-5 right-5 transition-all duration-500 ease-in-out z-50 p-4 rounded-lg shadow-lg bg-green-50 text-green-800 border border-green-200 max-w-sm ${
          showSlideIn ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-96'
        }`}
      >
        <div className="flex items-center">
          <i className="ri-check-circle-line text-xl mr-3"></i>
          <span>{slideInMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default CelebrationForm;