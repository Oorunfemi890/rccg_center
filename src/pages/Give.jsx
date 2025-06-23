import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Give = () => {
  return (
    <div className="bg-gray-50">
      <Navigation />
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Give Online</h1>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              Your generous giving helps us spread God's love and support our community missions.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Make a Donation</h3>
              <p className="text-gray-600 mb-6">
                Support our ministry and help us continue God's work in our community.
              </p>
              <button className="bg-primary text-white px-8 py-3 rounded-button font-medium hover:bg-primary/90 transition-colors">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Give;
