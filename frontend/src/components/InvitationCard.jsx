import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const InvitationCard = () => {
  const handleDownloadPDF = () => {
    // Mock PDF download
    alert('PDF invitation download will be implemented with backend integration');
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-serif text-center mb-12 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
        You're Invited
      </h2>
      
      <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden">
        <CardContent className="p-12">
          <div className="text-center">
            {/* Decorative elements */}
            <div className="mb-8">
              <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto mb-4"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto"></div>
            </div>
            
            {/* Main invitation text */}
            <h3 className="font-serif text-5xl mb-6 text-gray-800">
              Jith <span className="text-rose-500">&</span> Pooja
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Together with our families, we joyfully invite you to celebrate our union 
              through two beautiful ceremonies honoring both of our traditions.
            </p>

            {/* Wedding details */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-rose-50 rounded-lg p-6">
                <h4 className="font-serif text-2xl text-rose-600 mb-3">Christian Wedding</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong> August 25th, 2025
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Time:</strong> 11:00 AM
                </p>
                <p className="text-gray-700">
                  <strong>Venue:</strong> Madre De Deus Church<br />
                  Vettucaud, Kerala
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-serif text-2xl text-purple-600 mb-3">Hindu Wedding</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong> August 28th, 2025
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Muhurtham:</strong> 10:15 AM - 10:45 AM
                </p>
                <p className="text-gray-700">
                  <strong>Venue:</strong> Al Saj Arena<br />
                  Trivandrum, Kerala
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="mb-8">
              <div className="w-12 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto mb-4"></div>
              <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto"></div>
            </div>

            {/* Download button */}
            <Button 
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Download Invitation Card
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvitationCard;