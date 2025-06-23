import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      <Navigation />
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">About Us</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to the Redeemed Christian Church of God - Liberty Christian Center. We are a vibrant, loving
              community dedicated to sharing God's love and message of hope.
            </p>
            <p className="text-lg text-gray-600">
              Our doors and hearts are open to all who seek spiritual growth and fellowship.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
