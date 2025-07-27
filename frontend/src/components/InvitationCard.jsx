import React from 'react';
import { Button } from './ui/button';

const InvitationCard = () => {
  const handleDownloadChristian = () => {
    // Mock PNG download for Christian wedding
    alert('Christian wedding invitation PNG download - will be implemented');
  };

  const handleDownloadHindu = () => {
    // Mock PNG download for Hindu wedding
    alert('Hindu wedding invitation PNG download - will be implemented');
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
          You're Invited
        </h2>
        <div className="w-12 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-base font-light text-gray-600 max-w-2xl mx-auto">
          Together with our families, we joyfully invite you to celebrate our union 
          through two beautiful ceremonies honoring both of our traditions.
        </p>
      </div>
      
      {/* Side by side invitation cards */}
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Christian Wedding Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Card Preview */}
          <div className="h-80 bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-6xl mb-4">💒</div>
              <div className="text-sm font-light text-gray-600 mb-2">Christian Wedding</div>
              <div className="text-lg font-light text-gray-900">Jith & Pooja</div>
              <div className="absolute top-4 right-4 bg-white/80 px-2 py-1 rounded text-xs font-light text-gray-600">
                PNG Preview
              </div>
            </div>
          </div>
          
          {/* Card Details */}
          <div className="p-6">
            <h3 className="text-xl font-light text-gray-900 mb-4 text-center">Christian Wedding</h3>
            <div className="space-y-2 text-sm font-light text-gray-600 text-center mb-6">
              <p><span className="font-normal text-gray-900">Date:</span> August 25, 2025</p>
              <p><span className="font-normal text-gray-900">Time:</span> 11:00 AM</p>
              <p><span className="font-normal text-gray-900">Venue:</span> Madre De Deus Church</p>
              <p>Vettucaud, Kerala</p>
            </div>
            
            <Button 
              onClick={handleDownloadChristian}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-sm font-light rounded-xl transition-colors duration-200"
            >
              📥 Download Christian Invitation
            </Button>
          </div>
        </div>

        {/* Hindu Wedding Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Card Preview */}
          <div className="h-80 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-6xl mb-4">🕉️</div>
              <div className="text-sm font-light text-gray-600 mb-2">Hindu Wedding</div>
              <div className="text-lg font-light text-gray-900">Jith & Pooja</div>
              <div className="absolute top-4 right-4 bg-white/80 px-2 py-1 rounded text-xs font-light text-gray-600">
                PNG Preview
              </div>
            </div>
          </div>
          
          {/* Card Details */}
          <div className="p-6">
            <h3 className="text-xl font-light text-gray-900 mb-4 text-center">Hindu Wedding</h3>
            <div className="space-y-2 text-sm font-light text-gray-600 text-center mb-6">
              <p><span className="font-normal text-gray-900">Date:</span> August 28, 2025</p>
              <p><span className="font-normal text-gray-900">Muhurtham:</span> 10:15 AM - 10:45 AM</p>
              <p><span className="font-normal text-gray-900">Venue:</span> Al Saj Arena</p>
              <p>Trivandrum, Kerala</p>
            </div>
            
            <Button 
              onClick={handleDownloadHindu}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-sm font-light rounded-xl transition-colors duration-200"
            >
              📥 Download Hindu Invitation
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvitationCard;