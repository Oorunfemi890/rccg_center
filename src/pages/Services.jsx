import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceTimes from "@/components/ServiceTimes";

const Services = () => {
  return (
    <div className="bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Our Services</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Join us for worship, fellowship, and spiritual growth throughout the week.
          </p>
        </div>
        <ServiceTimes />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
