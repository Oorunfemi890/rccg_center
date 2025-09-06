import ServiceTimes from "@/components/ServiceTimes";

const Services = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for worship, fellowship, and spiritual growth throughout the week. Experience God's presence in our vibrant services.
          </p>
        </div>
      </section>

      {/* Service Times Component */}
      <ServiceTimes />

      {/* What to Expect */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What to Expect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every service is designed to help you encounter God and grow in your faith journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-music-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Powerful Worship</h3>
              <p className="text-gray-600">
                Experience heartfelt worship through contemporary music, traditional hymns, and spirit-filled praise.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-book-open-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Biblical Teaching</h3>
              <p className="text-gray-600">
                Receive practical, life-changing messages from God's Word that apply to your daily life.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-group-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Warm Fellowship</h3>
              <p className="text-gray-600">
                Connect with a loving community of believers who will support you in your spiritual journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Services</h2>
            <p className="text-gray-600">
              Beyond our regular weekly services, we host special events throughout the year.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-fire-line text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Holy Ghost Services</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Monthly power-packed services with supernatural encounters, divine healing, and spiritual breakthrough.
              </p>
              <p className="text-sm text-gray-500">First Friday of every month • 7:00 PM</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-calendar-event-line text-yellow-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Special Events</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Annual conventions, crusades, conferences, and community outreach programs throughout the year.
              </p>
              <p className="text-sm text-gray-500">Various dates • Check our events calendar</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Visitors */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">First Time Visiting?</h2>
              <p className="text-xl mb-6 opacity-90">
                We're excited to welcome you to our church family! Here's what you need to know for your first visit.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="ri-map-pin-line text-2xl mr-4"></i>
                  <span>Easy parking available on-site</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-shirt-line text-2xl mr-4"></i>
                  <span>Come as you are - casual dress is welcome</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-time-line text-2xl mr-4"></i>
                  <span>Services start promptly at scheduled times</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-group-line text-2xl mr-4"></i>
                  <span>Friendly ushers will help you find your way</span>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Plan Your Visit</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Sunday Services</h4>
                  <p className="opacity-90">Main service: 9:00 AM - 12:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <p className="opacity-90">Akins Bus stop, Marshy Hill Estate, 31 Bisi Afolabi St, Addo Rd, Ajah</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <p className="opacity-90">+234 803 331 7762</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;