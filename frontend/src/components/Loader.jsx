import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/images/traditional2.jpg)',
        }}
      ></div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/80"></div>
      
      <div className="relative z-10">
        {/* Elegant image frame */}
        {/* <div className="flex justify-center mb-8">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="/images/traditional1.jpg"
              alt="Jith & Pooja"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <div class="text-center">
                      <div class="text-4xl mb-2">💕</div>
                      <p class="text-sm">Jith & Pooja</p>
                    </div>
                  </div>
                `;
              }}
            />
          </div>
        </div> */}
        
        {/* Two lines animation */}
        <div className="flex items-center justify-center space-x-1 mb-8">
          <div className="w-16 h-0.5 bg-gray-800 transform origin-right animate-slide-right"></div>
          <div className="w-16 h-0.5 bg-gray-800 transform origin-left animate-slide-left"></div>
        </div>
        
        {/* Wedding text */}
        <div className="text-center">
          <p className="text-lg font-light text-gray-800 tracking-widest animate-fade-in-up mb-2">
            JITH & POOJA
          </p>
          <p className="text-sm font-light text-gray-600 animate-fade-in-up-delay mb-4">
            Two Hearts, One Love
          </p>
          <p className="text-xs font-light text-gray-500 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;