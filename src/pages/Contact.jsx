import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
    }, 2000);
  };

  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail('');
    }, 2000);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with us using the form below or through our contact information.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    <option>General Inquiry</option>
                    <option>Prayer Request</option>
                    <option>Join a Department</option>
                    <option>Volunteering</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
                >
                  <span className="submit-text">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {isSubmitting && (
                    <div className="submit-spinner ml-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="ri-map-pin-line text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
                      <p className="text-gray-600">Akins Bus stop, Marshy Hill Estate, 31 Bisi Afolabi St, Addo Rd, Ajah.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="ri-phone-line text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">+234 803 331 7762</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="ri-time-line text-purple-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Office Hours</h4>
                      <p className="text-gray-600">Saturday: 3:00 PM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Times */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Service Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday Fire Service</span>
                    <span className="text-gray-600">7:30 AM - 8:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday School</span>
                    <span className="text-gray-600">8:00 AM - 9:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday Main Service</span>
                    <span className="text-gray-600">9:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tuesday Bible Study</span>
                    <span className="text-gray-600">6:00 PM - 7:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Wednesday Prayer</span>
                    <span className="text-gray-600">6:00 PM - 7:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Thursday Faith Clinic</span>
                    <span className="text-gray-600">6:00 PM - 7:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Find Us</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7928.565034010102!2d3.5839066!3d6.4858625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfbc9632918df%3A0x57eab32689ef849b!2sRCCG%20LIBERTY%20CHRISTIAN%20CENTRE!5e0!3m2!1sen!2sng!4v1748159714704!5m2!1sen!2sng"
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" 
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay Connected</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive updates about events, services, and church news.
            </p>
            <div className="flex justify-center flex-wrap gap-6 mb-8">
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap flex items-center justify-center min-w-[120px] transition-colors"
                >
                  <span>{isSubscribing ? 'Subscribing...' : 'Subscribe'}</span>
                  {isSubscribing && (
                    <div className="ml-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;