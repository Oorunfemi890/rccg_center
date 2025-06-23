const ServiceTimes = () => {
    const services = [
      {
        icon: "ri-fire-line",
        title: "Sunday Fire Service",
        time: "7:30 AM - 8:00 AM"
      },
      {
        icon: "ri-school-line", 
        title: "Sunday School Service",
        time: "8:00 AM - 9:00 AM"
      },
      {
        icon: "ri-building-2-line",
        title: "Sunday Main Service", 
        time: "9:00 AM - 12:00 AM"
      },
      {
        icon: "ri-book-open-line",
        title: "Tuesday Bible Study",
        time: "6:00 PM -7:30 PM"
      },
      {
        icon: "ri-shield-cross-line",
        title: "Wednesday Prayer Meeting",
        time: "6:00 PM -7:30 PM"
      },
      {
        icon: "ri-cross-line",
        title: "Thursday Faith Clinic",
        time: "6:00 PM - 7:30 PM"
      }
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Times</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="service-time bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <i className={`${service.icon} text-primary ri-2x`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ServiceTimes;
  