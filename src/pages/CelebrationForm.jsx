import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      const response = await fetch('', { // API Endpoint
        method: 'POST',
        body: submitFormData
      });
      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus('');
        setSlideInMessage(result.message || 'Successfully submitted!');
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
      } else {
        setStatusType('danger');
        setSubmissionStatus(`Error: ${result.message || response.statusText || 'Submission failed.'}`);
      }
    } catch (error) {
      setStatusType('danger');
      setSubmissionStatus(`Network Error: ${error.message || 'Could not connect to the server.'}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-12 mb-12">
          <h2 className="text-2xl text-center mb-6">🎉 Share a Celebration! 🥂</h2>
          
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="celebrationType" className="block font-bold mb-2">Type of Celebration:</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:shadow-sm"
                id="celebrationType" 
                name="celebrationType" 
                value={formData.celebrationType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="Birthday">Birthday 🎂</option>
                <option value="Wedding Anniversary">Wedding Anniversary 💍</option>
                <option value="Baby Dedications">Baby Dedications</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2">Name:</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:shadow-sm"
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block font-bold mb-2">Phone Number:</label>
              <input 
                type="tel" 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:shadow-sm"
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., 123-456-7890" 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pictures" className="block font-bold mb-2">Upload Pictures (Max 2):</label>
              <input 
                type="file" 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:shadow-sm"
                id="pictures" 
                name="pictures[]" 
                multiple 
                accept=".pdf,.jpg,.jpeg,.png" 
                onChange={handleFileChange}
                required 
              />
              <div className="text-sm text-gray-600 mt-1">Accepted formats: PDF, JPG, PNG, JPEG. At least one picture required.</div>
              {fileError && (
                <div className="text-red-600 mt-1">{fileError}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="month" className="block font-bold mb-2">Month:</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:shadow-sm"
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
                <label htmlFor="date" className="block font-bold mb-2">Date:</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:shadow-sm"
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

            <div className="mb-4">
              <label htmlFor="message" className="block font-bold mb-2">Additional Message (Optional):</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:shadow-sm"
                id="message" 
                name="message" 
                rows="3" 
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Leave Blank if None!"
              ></textarea>
            </div>

            {submissionStatus && (
              <div className={`mb-4 p-3 rounded ${
                statusType === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 
                statusType === 'danger' ? 'bg-red-100 text-red-800 border border-red-200' : ''
              }`}>
                {submissionStatus}
              </div>
            )}

            <div>
              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors"
              >
                Submit Celebration
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Slide-in Success Message */}
      <div 
        className={`fixed top-5 transition-all duration-500 ease-in-out z-50 p-4 rounded shadow-lg bg-green-100 text-green-800 border border-green-200 w-80 ${
          showSlideIn ? 'right-5 opacity-100' : '-right-96 opacity-0'
        }`}
      >
        {slideInMessage}
      </div>

      <Footer />
    </div>
  );
};

export default CelebrationForm;
