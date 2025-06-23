const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/img/favicon.png" alt="RCCG Logo" className="h-12 mb-4" />
              <p className="text-gray-400">Transforming Lives Through Christ's Love</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ministries</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Give Online</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-primary transition-colors">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-primary transition-colors">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-primary transition-colors">
                  <i className="ri-youtube-line"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="space-y-4">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                />
                <button 
                  type="submit"
                  className="!rounded-button w-full bg-primary text-white py-2 text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Redeemed Christian Church of God - Liberty Christian Center</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  