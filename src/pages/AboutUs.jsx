const AboutUs = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our mission, vision, and the heart behind RCCG Liberty Christian Center
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <i className="ri-target-line text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To make heaven, to take as many people with us, and to have a member of RCCG in every family of all nations. We are committed to spreading the gospel of Jesus Christ through word and deed, fostering spiritual growth, and building a community of believers who demonstrate God's love.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <i className="ri-eye-line text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be a church where everyone can discover their purpose, develop their gifts, and deploy their talents in service to God and humanity. We envision a community that transforms lives, impacts society, and reflects the love of Christ in all we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  RCCG Liberty Christian Center was established as a parish of The Redeemed Christian Church of God, 
                  founded by Pastor Josiah Akindayomi in 1952. Our local assembly has been serving the community 
                  with dedication, love, and the transforming power of the Gospel.
                </p>
                <p>
                  Located in the heart of Ajah, Lagos, we have been blessed to witness countless testimonies of 
                  God's goodness, healing, restoration, and divine interventions in the lives of our members and 
                  the broader community.
                </p>
                <p>
                  We are a Bible-believing, Holy Spirit-filled church that emphasizes practical Christianity, 
                  holiness, and the manifestation of God's power in our daily lives.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="/img/WhatsApp Image 2025-01-15 at 13.59.55.jpeg" 
                alt="Church Community" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do as a church community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-book-open-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Biblical Foundation</h3>
              <p className="text-gray-600">
                We believe in the absolute authority of God's Word and build our faith and practices on biblical principles.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Love & Compassion</h3>
              <p className="text-gray-600">
                We demonstrate Christ's love through genuine care, support, and service to one another and our community.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-team-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unity & Fellowship</h3>
              <p className="text-gray-600">
                We foster an environment of unity, fellowship, and mutual support among all members of our church family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-gray-600">
              Meet the dedicated team committed to serving God and our community
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="/img/WhatsApp Image 2025-01-15 at 13.59.55.jpeg" 
                    alt="Senior Pastor" 
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pastor [Name]</h3>
                  <p className="text-blue-600 font-medium mb-4">Senior Pastor</p>
                  <p className="text-gray-600 leading-relaxed">
                    With a heart for God and a passion for souls, our Senior Pastor has been faithfully serving 
                    the Lord and leading our congregation with wisdom, love, and dedication. Under his leadership, 
                    our church has continued to grow in grace, faith, and impact in our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Family</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience God's love and find your place in our welcoming community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Visit Us Sunday
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;