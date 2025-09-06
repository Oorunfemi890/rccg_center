const Give = () => {
  // Function to scroll to account details section
  const scrollToAccountDetails = () => {
    const accountSection = document.getElementById('account-details');
    if (accountSection) {
      accountSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Give Online
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your generous giving helps us spread God's love, support our
            community missions, and impact lives for Christ.
          </p>
        </div>
      </section>

      {/* Why Give Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why We Give
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Giving is an act of worship and faith that allows us to
              participate in God's work on earth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Worship & Gratitude
              </h3>
              <p className="text-gray-600">
                Giving is an expression of our love for God and gratitude for
                His blessings in our lives.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-group-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kingdom Impact
              </h3>
              <p className="text-gray-600">
                Your gifts help spread the Gospel, support missions, and
                transform lives in our community and beyond.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-seedling-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Spiritual Growth
              </h3>
              <p className="text-gray-600">
                Generous giving cultivates a heart of faith, trust, and
                dependence on God.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ways to Give
            </h2>
            <p className="text-gray-600">
              Choose the method that works best for you to support God's work
              through our church.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tithes */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-percent-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tithes
              </h3>
              <p className="text-gray-600 mb-6">
                Give your tithe as an act of obedience and worship. The tithe
                belongs to the Lord (Leviticus 27:30).
              </p>
              <button 
                onClick={scrollToAccountDetails}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Give Tithe
              </button>
            </div>

            {/* Offerings */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-gift-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Offerings
              </h3>
              <p className="text-gray-600 mb-6">
                Give your offering as a free-will gift above your tithe to
                support special church projects and missions.
              </p>
              <button 
                onClick={scrollToAccountDetails}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                Give Offering
              </button>
            </div>

            {/* Special Projects */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-building-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Special Projects
              </h3>
              <p className="text-gray-600 mb-6">
                Contribute to specific church building projects, equipment
                purchases, and community outreach programs.
              </p>
              <button 
                onClick={scrollToAccountDetails}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Give to Projects
              </button>
            </div>

            {/* Missions */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-earth-line text-orange-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Missions
              </h3>
              <p className="text-gray-600 mb-6">
                Support local and international missionary work, evangelism
                efforts, and church planting initiatives.
              </p>
              <button 
                onClick={scrollToAccountDetails}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
              >
                Support Missions
              </button>
            </div>

            {/* Welfare */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-hand-heart-line text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Welfare & Care
              </h3>
              <p className="text-gray-600 mb-6">
                Help support church members and community members in need
                through our welfare and assistance programs.
              </p>
              <button 
                onClick={scrollToAccountDetails}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              >
                Give to Welfare
              </button>
            </div>

            {/* General Donation */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-coin-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                General Donation
              </h3>
              <p className="text-gray-600 mb-6">
                Make a general donation to support the overall ministry and
                operations of our church.
              </p>
              <button 
                onClick={scrollToAccountDetails}
                className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors cursor-pointer"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Methods
            </h2>
            <p className="text-gray-600">
              We accept various payment methods to make giving convenient for
              you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bank-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bank Transfer
              </h3>
              <p className="text-gray-600 text-sm">
                Direct bank transfer to church account
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-smartphone-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile Money
              </h3>
              <p className="text-gray-600 text-sm">
                Pay using mobile money platforms
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bank-card-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Debit/Credit Card
              </h3>
              <p className="text-gray-600 text-sm">
                Secure online card payments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Details - Added ID for scrolling */}
      <section id="account-details" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bank-line text-blue-600 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bank Account Details
              </h2>
              <p className="text-gray-600">
                For direct bank transfers, use the following account details:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Bank Name:</span>
                  <span className="text-gray-900 font-semibold">GTBank</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">
                    Account Name:
                  </span>
                  <span className="text-gray-900 font-semibold">
                    RCCG Liberty Christian Center
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">
                    Account Number:
                  </span>
                  <span className="text-gray-900 font-mono font-bold text-lg text-blue-600">
                    0013322336
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">SWIFT Code:</span>
                  <span className="text-gray-900 font-mono">GTBINGLA</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Reference:</span>
                  <span className="text-gray-900">Your Name + Purpose</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Bank Code:</span>
                  <span className="text-gray-900 font-mono">058</span>
                </div>
              </div>
            </div>
            
            {/* Quick Copy Feature */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <i className="ri-clipboard-line mr-2"></i>
                Quick Copy Account Details:
              </h4>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div className="flex justify-between items-center">
                  <span>Account Number: 0013322336</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText('0013322336')}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                    title="Copy account number"
                  >
                    <i className="ri-file-copy-line"></i>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>Bank: GTBank</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText('GTBank')}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                    title="Copy bank name"
                  >
                    <i className="ri-file-copy-line"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm flex items-start">
                <i className="ri-information-line mr-2 mt-0.5 flex-shrink-0"></i>
                <span>
                  <strong>Important:</strong> Please include your name and the purpose of giving 
                  (Tithe, Offering, Special Project, etc.) in the payment reference/description 
                  for proper record keeping. Example: "John Doe - Tithe"
                </span>
              </p>
            </div>

            {/* Example Reference Format */}
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Reference Format Examples:</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• For Tithe: "Your Name - Tithe"</li>
                <li>• For Offering: "Your Name - Offering"</li>
                <li>• For Projects: "Your Name - Building Project"</li>
                <li>• For Missions: "Your Name - Missions"</li>
                <li>• For Welfare: "Your Name - Welfare"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Biblical Foundation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Biblical Foundation
            </h2>
            <p className="text-gray-600">
              Our giving is rooted in God's Word and His principles for generous
              living.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-double-quotes-l text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">
                    "Bring the whole tithe into the storehouse, that there may
                    be food in my house. Test me in this," says the Lord
                    Almighty, "and see if I will not throw open the floodgates
                    of heaven and pour out so much blessing that there will not
                    be room enough to store it."
                  </p>
                  <p className="text-blue-600 font-semibold">Malachi 3:10</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-double-quotes-l text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">
                    "Remember this: Whoever sows sparingly will also reap
                    sparingly, and whoever sows generously will also reap
                    generously. Each of you should give what you have decided in
                    your heart to give, not reluctantly or under compulsion, for
                    God loves a cheerful giver."
                  </p>
                  <p className="text-green-600 font-semibold">
                    2 Corinthians 9:6-7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Questions */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Giving?</h2>
          <p className="text-xl mb-8 opacity-90">
            We're here to help you understand biblical giving and answer any
            questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Our Pastor
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Call Us: +234 803 331 7762
            </button>
          </div>
        </div>
      </section>

      {/* Thanksgiving */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-heart-3-line text-yellow-600 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You for Your Generosity
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your faithful giving enables us to fulfill our mission of
              spreading the Gospel, caring for our community, and advancing
              God's Kingdom. We are deeply grateful for your partnership in
              ministry and pray that God will bless you abundantly as you
              continue to be a cheerful giver.
            </p>
            <div className="mt-6 text-blue-600 font-semibold">
              "God is able to bless you abundantly, so that in all things at all
              times, having all that you need, you will abound in every good
              work." - 2 Corinthians 9:8
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Give;