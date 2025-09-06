import { useState } from 'react';
import PastorModal from './PastorModal'; // Adjust the import path as needed

const WelcomeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Same pastor message as in modal - this is the source of truth
  const pastorFullMessage = `Beloved Family in Christ,

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

"For I know the thoughts that I think toward you, says the LORD, thoughts of peace and not of evil, to give you a future and a hope." - Jeremiah 29:11`;

  // Extract first few paragraphs for preview
  const getPreviewText = () => {
    const paragraphs = pastorFullMessage.split('\n\n');
    return paragraphs.slice(0, 4).join('\n\n'); // First 4 paragraphs for preview
  };

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome Message from Our Area Pastor
              </h2>
              <div className="text-gray-600 mb-6">
                {/* Basic welcome - always shown */}
                <p className="mb-4">
                  <strong>Dear Beloved Family and Friends,</strong>
                </p>
                <p className="mb-4">
                  Welcome to the Redeemed Christian Church of God - Liberty Christian Center. It is with tremendous joy and gratitude to God that I welcome you to our spiritual home. We are a vibrant, loving community dedicated to sharing God's love and message of hope.
                </p>
                
                {/* Extended preview text for larger screens */}
                <div className="hidden lg:block space-y-4">
                  <p>
                    Our church is more than just a place of worship; it is a sanctuary where lives are transformed, destinies are shaped, and where the supernatural power of God is made manifest. We are a community of believers who have experienced the redemptive love of Jesus Christ.
                  </p>
                  
                  <p>
                    At Liberty Christian Center, we believe that every individual is fearfully and wonderfully made by God, with a unique purpose and calling. Whether you are seeking answers to life's challenging questions, looking for healing and restoration, or simply searching for a place to belong, you have found your home here.
                  </p>
                  
                  <p className="text-blue-600 font-medium italic">
                    "Come as you are, and let God transform you into who He created you to be."
                  </p>
                </div>
                
                {/* Indication for more content */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <p className="text-blue-700 text-sm font-medium">
                    📖 This is just a preview. Click "Learn More About Us" to read the pastor's complete welcome message with his photo and full spiritual guidance.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={openModal}
                  className="bg-blue-600 text-white px-6 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Learn More About Us
                </button>
                
                {/* Additional visual cue */}
                <div className="lg:hidden flex items-center text-gray-500 text-xs">
                  <span className="animate-pulse">👆</span>
                  <span className="ml-1">Read pastor's full message</span>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/img/WhatsApp Image 2025-01-15 at 13.59.55.jpeg" 
                className="rounded-lg shadow-lg w-full" 
                alt="Area Pastor" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pastor Modal - Pass the full message */}
      <PastorModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        fullMessage={pastorFullMessage}
      />
    </>
  );
};

export default WelcomeSection;