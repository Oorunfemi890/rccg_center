import { useState, useEffect } from 'react';
import EventCard from './eventschilds/EventCard';
import EventModal from './eventschilds/EventModal';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock API function - replace with your actual API endpoint
  const fetchEventsFromAPI = async () => {
    try {
      // Using JSONPlaceholder as a mock API - you can replace this with your church events API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = await response.json();
      
      // Transform the mock data into event format
      const transformedEvents = data.map((item, index) => ({
        id: item.id,
        title: `Church Event ${item.id}`,
        description: item.body.substring(0, 100) + '...',
        fullDescription: item.body + '\n\nJoin us for this special event as we come together in fellowship and worship. This event promises to be a time of spiritual growth, community building, and celebration of our faith.',
        date: new Date(Date.now() + (index * 7 * 24 * 60 * 60 * 1000)).toISOString(), // Events spread over weeks
        image: `https://picsum.photos/400/300?random=${item.id}`,
        location: 'RCCG Liberty Christian Center',
        time: '10:00 AM - 12:00 PM'
      }));
      
      return transformedEvents;
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to hardcoded events if API fails
      return [
        {
          id: 1,
          image: "https://public.readdy.ai/ai/img_res/3d280379439ea93a59d9fd2c20715523.jpg",
          date: "2025-11-22",
          title: "Halleluyah Praise S10",
          description: "Join us in giving praise and worship with special guest artists.",
          fullDescription: "Join us in giving praise and worship with special guest artists. This special service will feature contemporary worship music, testimonies, and a powerful message from our pastor. Come and experience the joy of praising God together as a community.",
          location: "Main Sanctuary",
          time: "6:00 PM - 8:00 PM"
        },
        {
          id: 2,
          image: "https://public.readdy.ai/ai/img_res/9dbb47b25dda10097f42bc50c7ec1f12.jpg",
          date: "2025-05-02",
          title: "HOLY GHOST SERVICE",
          description: "RCCG MAY 2025 HOLY GHOST SERVICE.",
          fullDescription: "RCCG MAY 2025 HOLY GHOST SERVICE. A night of supernatural encounters, divine healing, and spiritual breakthrough. Join thousands of believers as we seek God's face together in this powerful monthly service.",
          location: "Redemption City",
          time: "7:00 PM - 11:00 PM"
        },
        {
          id: 3,
          image: "/img/event1.jpeg",
          date: "2025-08-15",
          title: "ANNUAL CONVENTION",
          description: "The RCCG's 73rd Annual Convention, will be held on August 2025 at The Redemption City.",
          fullDescription: "The RCCG's 73rd Annual Convention will be held on August 2025 at The Redemption City, Lagos-Ibadan Expressway. This is our biggest event of the year featuring international speakers, special programs for all age groups, and a time of corporate worship and fellowship.",
          location: "The Redemption City, Lagos-Ibadan Expressway",
          time: "August 12-18, 2025"
        }
      ];
    }
  };

  // Filter upcoming events (events that haven't passed)
  const filterUpcomingEvents = (eventsList) => {
    const now = new Date();
    const upcoming = eventsList
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3); // Show only 3 upcoming events
    
    return upcoming;
  };

  // Load events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await fetchEventsFromAPI();
        setEvents(eventsData);
        const upcoming = filterUpcomingEvents(eventsData);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Periodically check for expired events (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (events.length > 0) {
        const upcoming = filterUpcomingEvents(events);
        setUpcomingEvents(upcoming);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [events]);

  const handleLearnMore = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Upcoming Events
          </h2>
          
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No upcoming events at this time.</p>
              <p className="text-gray-500">Please check back later for new events.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onLearnMore={handleLearnMore}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <button className="bg-blue-800 text-white px-8 py-3 text-lg font-medium rounded hover:bg-blue-900 transition-colors cursor-pointer">
              View All Events
            </button>
          </div>
        </div>
      </section>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default EventsSection;