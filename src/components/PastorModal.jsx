const PastorModal = ({ isOpen, onClose, fullMessage }) => {
  if (!isOpen) return null;

  const pastorData = {
    name: "Pastor [Your Pastor's Name]", // Replace with actual pastor name
    title: "Area Pastor, RCCG Liberty Christian Center",
    image: "/img/WhatsApp Image 2025-01-15 at 13.59.55.jpeg",
    fullMessage: fullMessage || `Beloved Family in Christ,

Grace and peace be multiplied unto you in the mighty name of our Lord Jesus Christ!

It is with tremendous joy and gratitude to God that I welcome you to the Redeemed Christian Church of God - Liberty Christian Center. Whether you are visiting us for the first time or you have been part of our spiritual family for years, I want you to know that your presence here is a divine appointment orchestrated by the Almighty God.

Our church is more than just a place of worship; it is a sanctuary where lives are transformed, destinies are shaped, and where the supernatural power of God is made manifest. We are a community of believers who have experienced the redemptive love of Jesus Christ and are committed to extending that same love to everyone who walks through our doors.

At Liberty Christian Center, we believe that every individual is fearfully and wonderfully made by God, with a unique purpose and calling. Our mission is to create an atmosphere where you can encounter God personally, grow in your faith, and discover the amazing plans He has for your life. We are not just building a church; we are building lives, families, and a generation that will impact the world for Christ.

Our vision extends beyond the four walls of our sanctuary. We are committed to raising disciples who will go into their communities, workplaces, and nations as ambassadors of Christ. Through our various ministries and outreach programs, we are touching lives, bringing hope to the hopeless, and demonstrating the practical love of God to all.

I want to personally invite you to become part of this incredible journey. Whether you are seeking answers to life's challenging questions, looking for healing and restoration, desiring to grow in your relationship with God, or simply searching for a place to belong, you have found your home here at Liberty Christian Center.

Our doors are always open, our hearts are ready to receive you, and our arms are extended to embrace you as family. Come as you are, with all your struggles, dreams, and aspirations. Allow God to do something beautiful in your life as you fellowship with us.

Remember, your best days are ahead of you! God has prepared good works for you to walk in, and we are here to support you every step of the way. Together, we will grow in grace, serve our community, and advance the Kingdom of God on earth.

I look forward to meeting you personally and to witnessing what God will do in and through your life as part of our Liberty Christian Center family.

May the Lord bless you abundantly and keep you in His perfect will.

In His Service and Love,

Pastor [Your Pastor's Name]
Area Pastor
RCCG Liberty Christian Center

"For I know the thoughts that I think toward you, says the LORD, thoughts of peace and not of evil, to give you a future and a hope." - Jeremiah 29:11`
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors text-xl font-bold z-10"
          >
            ×
          </button>
          
          <div className="p-8">
            {/* Pastor Header Info - Name and Title */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">{pastorData.name}</h2>
              <p className="text-blue-600 font-semibold text-lg">{pastorData.title}</p>
            </div>
            
            {/* Pastor Image */}
            <div className="flex justify-center mb-6">
              <img
                src={pastorData.image}
                alt={pastorData.name}
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Full Message Text - flows below the image */}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {pastorData.fullMessage}
              </p>
            </div>
            
            <div className="text-center mt-6">
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors font-medium"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastorModal;