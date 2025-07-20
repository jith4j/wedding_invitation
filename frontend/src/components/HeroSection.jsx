import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';

const CountdownTimer = ({ targetDate, title, isMain = false }) => {
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
    <Card className={`p-6 bg-white/20 backdrop-blur-lg border-white/30 ${isMain ? 'transform hover:scale-105' : ''} transition-all duration-300`}>
      <h3 className={`text-center font-serif mb-4 ${isMain ? 'text-xl' : 'text-lg'} font-semibold text-white`}>
        {title}
      </h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-white/10 rounded-lg p-2">
            <div className={`${isMain ? 'text-2xl' : 'text-xl'} font-bold text-white`}>
              {value}
            </div>
            <div className="text-xs text-white/80 capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/50 via-purple-900/40 to-pink-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="font-serif text-6xl md:text-8xl font-light text-white mb-4 animate-fade-in">
            Jith <span className="text-rose-300">&</span> Pooja
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Two hearts, Two traditions, One beautiful journey
          </p>
        </div>

        {/* Countdown Timers */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <CountdownTimer 
            targetDate="2025-08-25T11:00:00"
            title="Christian Wedding"
            isMain={true}
          />
          <CountdownTimer 
            targetDate="2025-08-28T10:15:00"
            title="Hindu Wedding"
            isMain={true}
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;