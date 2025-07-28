const EventCard = ({ event, onLearnMore }) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="event-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={event.image}
        className="w-full h-48 object-cover"
        alt={event.title}
      />
      <div className="p-6">
        <div className="text-sm text-blue-600 font-semibold mb-2">
          {formattedDate}
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>
        <button
          onClick={() => onLearnMore(event)}
          className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default EventCard;