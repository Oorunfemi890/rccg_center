import React from 'react';

const ContactFooter = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p className="mb-2">RCCG Liberty Christian Center</p>
                        <p className="mb-2">Lagos, Nigeria</p>
                        <p className="mb-2">Phone: +234 803 852 7686</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                            <li><a href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                            <li><a href="/ministries" className="text-gray-400 hover:text-white transition-colors">Ministries</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                        <div className="flex flex-wrap gap-4">
                            <a href="" className="hover:text-primary">
                                <i className="ri-facebook-fill text-2xl"></i>
                            </a>
                            <a href="#" className="hover:text-primary">
                                <i className="ri-twitter-fill text-2xl"></i>
                            </a>
                            <a href="#" className="hover:text-primary">
                                <i className="ri-instagram-fill text-2xl"></i>
                            </a>
                            <a href="#" className="hover:text-primary">
                                <i className="ri-youtube-fill text-2xl"></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Service Times</h3>
                        <p className="mb-2">Sunday: 7:00 AM - 12:00 PM</p>
                        <p className="mb-2">Tuesday: 6:00 PM - 7:30 PM</p>
                        <p className="mb-2">Wednesday: 6:00 PM - 7:30 PM</p>
                        <p className="mb-2">Thursday: 6:00 PM - 7:30 PM</p>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center px-4">
                    <p>&copy; 2025 RCCG Liberty Christian Center. All rights reserved.</p>
                    <div className="mt-4">
                        <a href="#" className="text-gray-400 hover:text-primary mx-2">Privacy Policy</a>
                        <span className="text-gray-400">|</span>
                        <a href="#" className="text-gray-400 hover:text-primary mx-2">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;
