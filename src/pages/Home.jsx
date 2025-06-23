import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import ServiceTimes from "@/components/ServiceTimes";
import EventsSection from "@/components/EventsSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-gray-50">
      <Navigation />
      <HeroSection />
      <WelcomeSection />
      <ServiceTimes />
      <EventsSection />
      <MapSection />
      <Footer />
    </div>
  );
};

export default Index;
