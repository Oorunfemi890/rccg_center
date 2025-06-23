const EventsSection = () => {
    const events = [
      {
        image: "https://public.readdy.ai/ai/img_res/3d280379439ea93a59d9fd2c20715523.jpg",
        date: "November 22, 2025",
        title: "Halleluyah Praise S10",
        description: "Join us in giving praise and worship with special guest artists.",
        alt: "Worship Night"
      },
      {
        image: "https://public.readdy.ai/ai/img_res/9dbb47b25dda10097f42bc50c7ec1f12.jpg",
        date: "May 2, 2025", 
        title: "HOLY GHOST SERVICE",
        description: "RCCG MAY 2025 HOLY GHOST SERVICE.",
        alt: "Holy Ghost Service"
      },
      {
        image: "/img/event1.jpeg",
        date: "August, 2025",
        title: "ANNUAL CONVENTION", 
        description: "The RCCG's 73rd Annual Convention,will be held on August 2025 at The Redemption City, Lagos-Ibadan Expressway.",
        alt: "ANNUAL CONVENTION"
      }
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="event-card bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={event.image}
                  className="w-full h-48 object-cover" 
                  alt={event.alt}
                />
                <div className="p-6">
                  <div className="text-sm text-primary font-semibold mb-2">{event.date}</div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button className="!rounded-button bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="!rounded-button bg-secondary text-white px-8 py-3 text-lg font-medium hover:bg-secondary/90 transition-colors cursor-pointer whitespace-nowrap">
              View All Events
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default EventsSection;
  