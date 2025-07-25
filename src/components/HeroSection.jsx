const HeroSection = () => {
  return (
    <div className="relative pt-16">
      <div className="h-[600px] relative overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2017/01/03/01/08/jesus-christ-1948251_1280.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Church Interior"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to RCCG Liberty Christian Center
            </h1>
            <p className="text-xl mb-8">
              A place of worship, fellowship, and spiritual growth. Join us as
              we celebrate God's Love and Grace together.
            </p>
            <button className="!rounded-button bg-blue-500 text-white px-8 py-3 text-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
              <a href="#">
                <i className="ri-headphone-line mr-2"></i>Listen to God's
                Messages
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
