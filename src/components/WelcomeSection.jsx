const WelcomeSection = () => {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Message from Our Area Pastor</h2>
              <p className="text-gray-600 mb-6">
                Welcome to the Redeemed Christian Church of God - Liberty Christian Center. We are a vibrant, loving
                community dedicated to sharing God's love and message of hope. Our doors and hearts are open to
                all who seek spiritual growth and fellowship.
              </p>
              <button className="!rounded-button bg-primary text-white px-6 py-2 text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap">
                Learn More About Us
              </button>
            </div>
            <div>
              <img 
                src="/img/WhatsApp Image 2025-01-15 at 13.59.55.jpeg" 
                className="rounded-lg shadow-lg w-full" 
                alt="Senior Pastor" 
              />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default WelcomeSection;
  