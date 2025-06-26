import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Important

const ContactFormNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #1e40af;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .mobile-menu {
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
        }
        .mobile-menu.active {
          transform: translateX(0);
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src="/img/favicon.png" alt="RCCG Logo" className="h-12" />
              <div className="hidden md:flex ml-10 space-x-8">
                <Link to="/" className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">Home</Link>
                <Link to="/about-us" className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">About Us</Link>
                <Link to="/services" className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">Services</Link>
                <Link to="/ministries" className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">Ministries</Link>
                <Link to="/give" className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">Give</Link>
                <Link to="/contact" className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  <span style={{ color: 'blue' }}><b>Contact</b></span>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <Link to="/celebrate">
                <button className="rounded-lg bg-primary text-white px-6 py-2 text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap">
                  Celebrate Me
                </button>
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-primary">
                <i className="ri-menu-line ri-2x"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu fixed top-16 right-0 bottom-0 w-64 bg-white shadow-lg md:hidden ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4">
              <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
              <Link to="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About Us</Link>
              <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Services</Link>
              <Link to="/ministries" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Ministries</Link>
              <Link to="/give" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Give</Link>
              <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                <span style={{ color: 'blue' }}><b>Contact</b></span>
              </Link>
              <br />
              <Link to="/celebrate">
                <button style={{ marginLeft: '50px' }} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors whitespace-nowrap">
                  Celebrate Me
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ContactFormNavigation;
