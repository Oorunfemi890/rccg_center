import { Link } from 'react-router-dom';

const Celebrate = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">🎉 Celebrate Your Special Moments 🥂</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At RCCG Liberty Christian Center, we believe every milestone deserves to be celebrated. 
              Let us join you in giving thanks to God for His faithfulness in your life!
            </p>
          </div>
          <div 
            className="rounded-lg overflow-hidden shadow-xl mb-12"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px'
            }}
          >
            <div className="bg-black bg-opacity-40 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Every Celebration Matters</h2>
                <p className="text-lg opacity-90">From birthdays to anniversaries, we're here to celebrate with you!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Celebrate */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Celebrate</h2>
            <p className="text-gray-600">
              We believe in celebrating all of God's blessings in your life, big and small.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-red-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-cake-3-line text-red-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Birthdays 🎂</h3>
              <p className="text-gray-600">
                Celebrate another year of God's faithfulness and the gift of life He has given you.
              </p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-2-line text-pink-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Anniversaries 💍</h3>
              <p className="text-gray-600">
                Honor the covenant of marriage and celebrate years of love, partnership, and God's blessing.
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-baby-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Baby Dedications 👶</h3>
              <p className="text-gray-600">
                Welcome new life and dedicate precious children to the Lord's service and protection.
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-graduation-cap-line text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Graduations 🎓</h3>
              <p className="text-gray-600">
                Celebrate educational achievements and the opening of new doors of opportunity.
              </p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-briefcase-line text-yellow-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Milestones 💼</h3>
              <p className="text-gray-600">
                Acknowledge promotions, new jobs, business ventures, and professional achievements.
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-trophy-line text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Special Achievements 🏆</h3>
              <p className="text-gray-600">
                Honor any special accomplishment, breakthrough, or answered prayer in your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Celebrate */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Celebrate With You</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-notification-3-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Public Acknowledgment</h3>
                    <p className="text-gray-600">
                      With your permission, we can acknowledge your special day during our Sunday service announcements, 
                      allowing the entire congregation to join in celebrating with you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-hand-heart-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Prayer & Blessing</h3>
                    <p className="text-gray-600">
                      Our pastoral team and prayer warriors will specifically pray for you, asking God's continued 
                      blessing and favor upon your life and celebration.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-community-line text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Support</h3>
                    <p className="text-gray-600">
                      Experience the warmth of our church family as we come together to share in your joy 
                      and give thanks to God for His goodness in your life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Church celebration"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
            <p className="text-gray-600">
              Here's our simple process to ensure your celebration is handled with care and joy.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Form</h3>
              <p className="text-gray-600 text-sm">
                Fill out our celebration request form with your details and upload your pictures.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Approval</h3>
              <p className="text-gray-600 text-sm">
                Our team reviews your submission and confirms the celebration details with you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Preparation</h3>
              <p className="text-gray-600 text-sm">
                We prepare the acknowledgment and coordinate with our service team for your special mention.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Celebration!</h3>
              <p className="text-gray-600 text-sm">
                Enjoy your special moment as we celebrate together with prayers and thanksgiving!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Celebration?</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't let this special moment pass without giving God the glory! 
            Let our church family rejoice with you in thanksgiving.
          </p>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg mb-8">
            <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
              <div className="flex items-center">
                <i className="ri-heart-line text-2xl mr-2"></i>
                <span>Birthdays & Anniversaries</span>
              </div>
              <div className="flex items-center">
                <i className="ri-baby-line text-2xl mr-2"></i>
                <span>Baby Dedications</span>
              </div>
              <div className="flex items-center">
                <i className="ri-graduation-cap-line text-2xl mr-2"></i>
                <span>Graduations</span>
              </div>
              <div className="flex items-center">
                <i className="ri-trophy-line text-2xl mr-2"></i>
                <span>Special Achievements</span>
              </div>
            </div>
          </div>
          <Link to="/celebration-form">
            <button className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              🎉 Click Here to Submit Your Celebration 🎉
            </button>
          </Link>
          <p className="mt-4 opacity-90 text-sm">
            It only takes a few minutes to share your joy with us!
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Others Say</h2>
            <p className="text-gray-600">
              See how celebrating with our church family has blessed others.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-user-smile-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sister Mary</h4>
                  <p className="text-gray-500 text-sm">Birthday Celebration</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Having my birthday acknowledged during service made me feel so loved and appreciated. 
                The prayers from the congregation truly touched my heart!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-user-heart-line text-green-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Brother & Sister Johnson</h4>
                  <p className="text-gray-500 text-sm">25th Anniversary</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Celebrating our silver anniversary with our church family was unforgettable. 
                We felt God's presence and the love of our spiritual family."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-user-star-line text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Brother David</h4>
                  <p className="text-gray-500 text-sm">Graduation</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "When I graduated, the church's acknowledgment and prayers gave me confidence 
                for the next chapter of my life. I felt truly supported!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Celebrate;