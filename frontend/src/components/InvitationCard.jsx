import React from 'react';
import { Button } from './ui/button';

const InvitationCard = () => {
  const scrollToWedding = (weddingType) => {
    const element = document.getElementById(`${weddingType}-wedding`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light text-gray-900 mb-4">You're Invited</h2>
        <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
        <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
          Together with our families, we joyfully invite you to celebrate our union through two beautiful 
          ceremonies honoring both of our traditions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Christian Wedding Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-200">
              <img 
                src="/images/christian-icon.png"
                alt="Church"
                className="w-20 h-16 object-cover rounded-lg opacity-70"
              />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">Christian Wedding</h3>
            <h4 className="text-2xl font-light text-gray-900 mb-6">Jith & Pooja</h4>
          </div>

          <div className="space-y-4 mb-8">
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-lg font-light text-gray-900 mb-4">Christian Wedding</h4>
              <div className="space-y-2 text-sm font-light text-gray-600">
                <p><span className="text-gray-900">Date:</span> August 25, 2025</p>
                <p><span className="text-gray-900">Time:</span> 11:00 AM</p>
                <p><span className="text-gray-900">Venue:</span> Madre De Deus Church</p>
                <p>Vettucaud, Kerala</p>
              </div>
            </div>
          </div>

          <a
          href="/invitations/Christian.pdf"
          download="Christian.pdf"
          className="block w-full text-center bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 font-light py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
          📤 Download Christian Invitation
          </a>
        </div>

        {/* Hindu Wedding Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-200">
              <img 
                src="/images/hindu-icon.png"
                alt="Temple"
                className="w-20 h-16 object-cover rounded-lg opacity-70"
              />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">Hindu Wedding</h3>
            <h4 className="text-2xl font-light text-gray-900 mb-6">Jith & Pooja</h4>
          </div>

          <div className="space-y-4 mb-8">
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-lg font-light text-gray-900 mb-4">Hindu Wedding</h4>
              <div className="space-y-2 text-sm font-light text-gray-600">
                <p><span className="text-gray-900">Date:</span> August 28, 2025</p>
                <p><span className="text-gray-900">Muhurtham:</span> 10:15 AM - 10:45 AM</p>
                <p><span className="text-gray-900">Venue:</span> Al Saj Arena</p>
                <p>Trivandrum, Kerala</p>
              </div>
            </div>
          </div>

          <a
          href="/invitations/Hindu.pdf"
          download="Hindu.pdf"
          className="block w-full text-center bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 font-light py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
          📤 Download Hindu Invitation
          </a>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;