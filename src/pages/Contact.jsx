import React from 'react';
import ContactFormNavigation from '../components/ContactNavigation';
import ContactForm from '../components/ContactForm';
import ContactMap from '../components/ContactMap';
import ContactInfo from '../components/ContactInfo';
import SocialMediaSection from '../components/SocialMediaSection';
import ContactFooter from '../components/ContactFooter';

const Contact = () => {
  return (
    <div className="bg-white">
      <ContactFormNavigation />
      <main className="pt-24">
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-['Playfair_Display']">Contact Us</h1>
              <p className="text-gray-600">We'd love to hear from you. Please fill out this form or use our contact information below.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <div className="space-y-8">
                <ContactMap />
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
        <SocialMediaSection />
      </main>
      <ContactFooter />
    </div>
  );
};

export default Contact;