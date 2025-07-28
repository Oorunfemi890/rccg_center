import { useState, useEffect } from 'react';

const HeroSection = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2017/01/03/01/08/jesus-christ-1948251_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/05/45/architecture-1867187_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/13/cathedral-1869833_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/04/03/16/32/praise-2199259_1280.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative pt-16">
      <div className="h-[600px] relative overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`Church Background ${index + 1}`}
          />
        ))}
        
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
            <button className="rounded bg-blue-500 text-white px-8 py-3 text-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
              <a href="#">
                <i className="ri-headphone-line mr-2"></i>Listen to God's
                Messages
              </a>
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;