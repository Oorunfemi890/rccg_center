const CelebrateFooter = () => {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
            <img src="/img/favicon.png" alt="RCCG Logo" className="h-12 mb-4" />
            <br />
              <p className="text-gray-400">
                The Redeemed Christian Church of God (RCCG) is a holiness pentecostal megachurch and denomination.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="/ministries" className="text-gray-400 hover:text-white transition-colors">Ministries</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mt-1 mr-2">
                    <i className="ri-map-pin-line"></i>
                  </div>
                  <span className="text-gray-400">
                    Akins Bus stop, Marshy Hill Estate, 31 Bisi Afolabi St, Addo Rd, Ajah.
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-phone-line"></i>
                  </div>
                  <span className="text-gray-400">+234 803 331 7762</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Times</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Sunday: 7:30 AM & 12:00 AM</li>
                <li>Tuesday: 6:00 PM - 7:00 PM</li>
                <li>Thursday: 6:00 PM - 7:00 PM</li>
              </ul>
              <h3 className="text-lg font-semibold mt-6 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="ri-youtube-line"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Redeemed Christian Church of God - Liberty Christian Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default CelebrateFooter;