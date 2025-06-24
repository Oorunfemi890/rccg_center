import React from 'react';

const ContactInfo = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-6 font-['Playfair_Display']">Direct Contact</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <i className="ri-phone-line text-primary text-xl"></i>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-gray-600">+234 803 331 7762</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <i className="ri-mail-line text-primary text-xl"></i>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p className="text-gray-600">info@rccg</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <i className="ri-time-line text-primary text-xl"></i>
          </div>
          <div>
            <p className="font-medium">Office Hour</p>
            <p className="text-gray-600">SATURDAY: 3:00 PM - 7:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;