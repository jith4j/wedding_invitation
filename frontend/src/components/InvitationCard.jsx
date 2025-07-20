import React from 'react';
import { Button } from './ui/button';

const InvitationCard = () => {
  const handleDownloadPDF = () => {
    // Mock PDF download
    alert('PDF invitation download will be implemented with backend integration');
  };

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
          You're Invited
        </h2>
        <div className="w-12 h-px bg-gray-300 mx-auto"></div>
      </div>
      
      <div className="bg-white border border-gray-100 rounded-none shadow-sm">
        <div className="p-12">
          <div className="text-center">
            
            {/* Main invitation text */}
            <h3 className="text-4xl font-light mb-8 text-gray-900 tracking-tight">
              Jith & Pooja
            </h3>
            
            <p className="text-base font-light text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
              Together with our families, we joyfully invite you to celebrate our union 
              through two beautiful ceremonies honoring both of our traditions.
            </p>

            {/* Wedding details */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="text-center">
                <h4 className="text-lg font-light text-gray-900 mb-4">Christian Wedding</h4>
                <div className="space-y-2 text-sm font-light text-gray-600">
                  <p>August 25, 2025</p>
                  <p>11:00 AM</p>
                  <p>Madre De Deus Church</p>
                  <p>Vettucaud, Kerala</p>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-lg font-light text-gray-900 mb-4">Hindu Wedding</h4>
                <div className="space-y-2 text-sm font-light text-gray-600">
                  <p>August 28, 2025</p>
                  <p>Muhurtham: 10:15 AM - 10:45 AM</p>
                  <p>Al Saj Arena</p>
                  <p>Trivandrum, Kerala</p>
                </div>
              </div>
            </div>

            {/* Download button */}
            <Button 
              onClick={handleDownloadPDF}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-sm font-light rounded-none transition-colors duration-200"
            >
              Download Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;