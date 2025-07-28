import { X, Calendar, MapPin, Clock } from 'lucide-react';

const EventModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={event.image}
            className="w-full h-64 object-cover"
            alt={event.title}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
            <Calendar size={16} />
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
          
          {event.location && (
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin size={16} />
              {event.location}
            </div>
          )}
          
          {event.time && (
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Clock size={16} />
              {event.time}
            </div>
          )}
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.fullDescription || event.description}
            </p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;