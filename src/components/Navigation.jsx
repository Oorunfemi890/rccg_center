import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="/img/favicon.png" alt="RCCG Logo" className="h-12" />
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                to="/"
                className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                <span className="text-blue-600 font-bold">Home</span>
              </Link>
              <Link
                to="/about-us"
                className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                to="/services"
                className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Services
              </Link>
              <Link
                to="/ministries"
                className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Ministries
              </Link>
              <Link
                to="/give"
                className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Give
              </Link>
              <Link
                to="/contact"
                className="nav-link text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/celebrate">
              <button className="rounded-button bg-primary text-white px-6 py-2 text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap">
                Celebrate Me
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
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <span className="text-blue-600 font-bold">Home</span>
            </Link>
            <Link
              to="/about-us"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              About Us
            </Link>
            <Link
              to="/services"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Services
            </Link>
            <Link
              to="/ministries"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Ministries
            </Link>
            <Link
              to="/give"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Give
            </Link>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Contact
            </Link>
            <br />
            <Link to="/celebrate" onClick={closeMobileMenu}>
              <button className="bg-primary text-white px-6 py-2 rounded-button font-medium hover:bg-opacity-90 transition-colors whitespace-nowrap ml-12">
                Celebrate Me
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
