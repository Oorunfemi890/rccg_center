import React from 'react';

const ContactMap = () => {
  return (
    <div className="h-64 rounded-lg shadow-lg relative overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7928.565034010102!2d3.5839066!3d6.4858625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfbc9632918df%3A0x57eab32689ef849b!2sRCCG%20LIBERTY%20CHRISTIAN%20CENTRE!5e0!3m2!1sen!2sng!4v1748159714704!5m2!1sen!2sng"
        width="100%" 
        height="100%" 
        style={{border:0}} 
        allowFullScreen="" 
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade" 
        className="w-full h-full"
      ></iframe>
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-2">Our Location</h3>
        <p className="text-gray-600">Akins Bus stop, Marshy Hill Estate, 31 Bisi Afolabi St, Addo Rd, Ajah.</p>
      </div>
    </div>
  );
};

export default ContactMap;