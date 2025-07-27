import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative">
        {/* Two lines animation */}
        <div className="flex items-center justify-center space-x-1">
          <div className="w-12 h-0.5 bg-gray-800 transform origin-right animate-slide-right"></div>
          <div className="w-12 h-0.5 bg-gray-800 transform origin-left animate-slide-left"></div>
        </div>
        
        {/* Wedding text */}
        <div className="mt-8 text-center">
          <p className="text-sm font-light text-gray-600 tracking-widest animate-fade-in-up">
            JITH & POOJA
          </p>
          <p className="text-xs font-light text-gray-400 mt-2 animate-fade-in-up-delay">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;