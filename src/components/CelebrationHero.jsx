const CelebrationHero = () => {
    return (
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
          <div 
            className="h-64 bg-gray-200"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Celebrate Your Special Moments</h1>
            <p className="text-xl text-gray-600 mb-6">
              At RCCG Liberty Christian Center, we would like to join you celebrate together. Whether it's a birthday, anniversary, or any other significant moment, we'd love to celebrate with you!
            </p>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center text-primary">
                  <i className="ri-heart-line ri-lg"></i>
                </div>
                <span className="ml-2 text-gray-700">Birthdays & Anniversaries</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center text-primary">
                  <i className="ri-user-heart-line ri-lg"></i>
                </div>
                <span className="ml-2 text-gray-700">Baby Dedications</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center text-primary">
                  <i className="ri-heart-2-line ri-lg"></i>
                </div>
                <span className="ml-2 text-gray-700">Weddings</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CelebrationHero;