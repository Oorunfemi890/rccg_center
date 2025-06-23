const MapSection = () => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Locate Us</h2>
          <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7928.565034010102!2d3.5839066!3d6.4858625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfbc9632918df%3A0x57eab32689ef849b!2sRCCG%20LIBERTY%20CHRISTIAN%20CENTRE!5e0!3m2!1sen!2sng!4v1748159714704!5m2!1sen!2sng"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" 
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default MapSection;
  