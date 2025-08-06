import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, title }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-center">
      <h3 className="text-sm font-light text-gray-700 mb-6 tracking-wide uppercase">
        {title}
      </h3>
      <div className="flex justify-center gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="text-2xl md:text-3xl font-light text-gray-900 mb-1">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs font-light text-gray-600 uppercase tracking-wide">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DoveIllustration = () => (
  <div className="flex justify-center mb-12">
    <svg
      width="60"
      height="40"
      viewBox="0 0 60 40"
      fill="none"
      className="text-gray-500"
    >
      <path
        d="M30 8C35 6 45 8 52 15C48 18 42 20 35 19C32 25 28 30 20 32C15 30 12 25 15 20C18 18 22 16 25 15C27 12 28 10 30 8Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M25 15C22 18 18 20 12 19C8 16 6 12 8 8C12 6 18 8 22 12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="28" cy="12" r="1" fill="currentColor" />
    </svg>
  </div>
);

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* Background image - mobile-friendly */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/traditional2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/60"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Dove Illustration */}
        <DoveIllustration />

        {/* Main Title */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-4 tracking-tight">
            Jith & Pooja
          </h1>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-6"></div>
          <p className="text-lg font-light text-gray-700 tracking-wide">
            Two hearts, Two traditions, One beautiful journey
          </p>
        </div>

        {/* Countdown Timers */}
        <div className="grid md:grid-cols-2 gap-16 max-w-2xl mx-auto">
          <CountdownTimer 
            targetDate="2025-08-25T11:00:00"
            title="Christian Wedding"
          />
          <CountdownTimer 
            targetDate="2025-08-28T10:15:00"
            title="Hindu Wedding"
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;