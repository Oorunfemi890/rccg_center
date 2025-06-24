import React, { useState } from 'react';

const SocialMediaSection = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState('');

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 font-['Playfair_Display']">Connect With Us</h2>
          <div className="flex justify-center flex-wrap gap-6 mb-8 px-4">
            <a href="" className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90">
              <i className="ri-facebook-fill text-xl"></i>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90">
              <i className="ri-twitter-fill text-xl"></i>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90">
              <i className="ri-instagram-fill text-xl"></i>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90">
              <i className="ri-youtube-fill text-xl"></i>
            </a>
          </div>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4 px-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Subscribe to our newsletter" 
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 whitespace-nowrap flex items-center justify-center min-w-[120px]"
                >
                  <span className="subscribe-text">{isSubscribing ? 'Subscribing...' : 'Subscribe'}</span>
                  {isSubscribing && (
                    <div className="subscribe-spinner ml-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;