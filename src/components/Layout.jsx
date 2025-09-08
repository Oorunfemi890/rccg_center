import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <img src="/img/favicon.png" alt="RCCG Logo" className="h-12" />
              </Link>
              <div className="hidden md:flex ml-10 space-x-8">
                <Link
                  to="/"
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-blue-600 font-bold' 
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about-us"
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/about-us') 
                      ? 'text-blue-600 font-bold' 
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  About Us
                </Link>
                <Link
                  to="/services"
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/services') 
                      ? 'text-blue-600 font-bold' 
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Services
                </Link>
                <Link
                  to="/give"
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/give') 
                      ? 'text-blue-600 font-bold' 
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Give
                </Link>
                <Link
                  to="/contact"
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/contact') 
                      ? 'text-blue-600 font-bold' 
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/celebrate">
                <button className="bg-primary text-white px-6 py-2 text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Celebrate Me
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-gray-100 text-gray-700 px-6 py-2 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                  <i className="ri-admin-line mr-2"></i>
                  Admin Sign In
                </button>
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary focus:outline-none"
              >
                <i className="ri-menu-line ri-2x"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-16 right-0 bottom-0 w-64 bg-white shadow-lg md:hidden transition-transform duration-300 ease-in-out transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`block px-4 py-2 hover:bg-gray-100 transition-colors ${
                  isActive('/') ? 'text-blue-600 font-bold' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                onClick={closeMobileMenu}
                className={`block px-4 py-2 hover:bg-gray-100 transition-colors ${
                  isActive('/about-us') ? 'text-blue-600 font-bold' : 'text-gray-700'
                }`}
              >
                About Us
              </Link>
              <Link
                to="/services"
                onClick={closeMobileMenu}
                className={`block px-4 py-2 hover:bg-gray-100 transition-colors ${
                  isActive('/services') ? 'text-blue-600 font-bold' : 'text-gray-700'
                }`}
              >
                Services
              </Link>
              <Link
                to="/give"
                onClick={closeMobileMenu}
                className={`block px-4 py-2 hover:bg-gray-100 transition-colors ${
                  isActive('/give') ? 'text-blue-600 font-bold' : 'text-gray-700'
                }`}
              >
                Give
              </Link>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className={`block px-4 py-2 hover:bg-gray-100 transition-colors ${
                  isActive('/contact') ? 'text-blue-600 font-bold' : 'text-gray-700'
                }`}
              >
                Contact
              </Link>
              
              {/* Mobile Action Buttons */}
              <div className="px-4 py-4 space-y-3 border-t border-gray-200 mt-4">
                <Link to="/celebrate" onClick={closeMobileMenu}>
                  <button className="w-full bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                    Celebrate Me
                  </button>
                </Link>
                <Link to="/login" onClick={closeMobileMenu}>
                  <button className="w-full bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <i className="ri-admin-line mr-2"></i>
                    Admin Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/img/favicon.png" alt="RCCG Logo" className="h-12 mb-4" />
              <p className="text-gray-400">
                The Redeemed Christian Church of God (RCCG) is a holiness pentecostal megachurch and denomination.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
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
                <li>Sunday: 7:30 AM & 12:00 PM</li>
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
    </div>
  );
};

export default Layout;