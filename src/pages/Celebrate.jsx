import Header from '../components/Header';
import CelebrationHero from '../components/CelebrationHero';
import CelebrationFeatures from '../components/CelebrationFeatures';
import CelebrationButton from '../components/CelebrationButton';
import ClebrateFooter from '../components/CelebrateFooter';

const Celebrate = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CelebrationHero />
          <CelebrationFeatures />
          <CelebrationButton />
        </div>
      </main>
      <ClebrateFooter />
    </div>
  );
};

export default Celebrate;