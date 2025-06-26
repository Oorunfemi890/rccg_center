const CelebrationFeatures = () => {
    return (
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Celebrate With You</h2>
            <div className="space-y-6">
              <div className="flex">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-primary rounded-full flex-shrink-0">
                  <i className="ri-notification-3-line ri-lg"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Public Acknowledgment</h3>
                  <p className="text-gray-600">
                    We can acknowledge your special day during our Sunday service announcements (with your permission).
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-primary rounded-full flex-shrink-0">
                  <i className="ri-group-line ri-lg"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Prayer Support</h3>
                  <p className="text-gray-600">
                    Our prayer team will specifically pray for you and your celebration.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
            <div className="space-y-6">
              <div className="flex">
                <div className="w-10 h-10 flex items-center justify-center text-primary flex-shrink-0">
                  <i className="ri-file-list-3-line ri-lg"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">
                    Fill out the celebration request form with your details and the type of celebration.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-10 h-10 flex items-center justify-center text-primary flex-shrink-0">
                  <i className="ri-user-received-2-line ri-lg"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">Your form will be received by our team</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-10 h-10 flex items-center justify-center text-primary flex-shrink-0">
                  <i className="ri-emotion-happy-line ri-lg"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">Enjoy your celebration with the support of the church!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CelebrationFeatures;