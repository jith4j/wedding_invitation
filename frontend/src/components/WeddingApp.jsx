import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import InvitationCard from './InvitationCard';
import ChristianWedding from './ChristianWedding';
import HinduWedding from './HinduWedding';
import UnifiedRSVP from './UnifiedRSVP';
import SendMessage from './SendMessage';
import FAQ from './FAQ';
import Loader from './Loader';
import { Toaster } from './ui/toaster';

const ParallaxSection = ({ children, backgroundImage, className = "" }) => {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Parallax background with photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-110 transition-transform duration-1000"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: 'translateZ(0) scale(1.1)',
        }}
      ></div>
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
};

const PhotoCarousel = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const casualPhotos = [
    '/images/casual1.jpg',
    '/images/casual2.jpg',
    '/images/casual3.jpg',
    '/images/casual4.jpg',
    '/images/casual55.jpg'
  ];

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % casualPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [casualPhotos.length]);

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - next image
      setCurrentPhoto((prev) => (prev + 1) % casualPhotos.length);
    }
    if (isRightSwipe) {
      // Swipe right - previous image
      setCurrentPhoto((prev) => (prev - 1 + casualPhotos.length) % casualPhotos.length);
    }
  };

  // Navigation functions
  const goToNext = () => {
    setCurrentPhoto((prev) => (prev + 1) % casualPhotos.length);
  };

  const goToPrevious = () => {
    setCurrentPhoto((prev) => (prev - 1 + casualPhotos.length) % casualPhotos.length);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Carousel with proper dimensions and centering */}
      <div className="relative w-80 h-96 mx-auto rounded-3xl overflow-hidden shadow-xl bg-gray-100 border border-gray-200">
        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Images container with swipe support */}
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {casualPhotos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentPhoto ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={photo}
                alt={`Save the date photo ${index + 1}`}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <div class="text-center">
                        <div class="text-6xl mb-4">📸</div>
                        <p class="text-sm">Save the date photo ${index + 1}</p>
                        <p class="text-xs mt-2">Upload casual${index + 1}.jpg to /app/frontend/public/images/</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {casualPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentPhoto ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Swipe instruction */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Swipe or use arrows to browse photos
      </p>
    </div>
  );
};

const WeddingApp = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the website - 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} onNavigate={scrollToSection} />
      
      <section id="home">
        <HeroSection />
      </section>

      <section id="invitation" className="py-16 bg-gray-50">
        <InvitationCard />
      </section>

      {/* Our Journey Section with Carousel */}
      <section id="our-journey" className="py-20 bg-gray-50">
        <div className="text-center text-gray-800 px-6 max-w-6xl mx-auto">
          <h2 className="text-5xl font-light mb-8 text-gray-900">Our Journey</h2>
          <p className="text-xl font-light mb-12 text-gray-700 max-w-2xl mx-auto">
            From casual moments to traditional celebrations, our love story unfolds
          </p>
          <PhotoCarousel />
        </div>
      </section>

      <section id="christian-wedding" className="bg-white">
        <ChristianWedding />
      </section>

      {/* Parallax Section 2 - Two Hearts, One Love */}
      <ParallaxSection 
        backgroundImage="/images/casual5.jpg"
        className="flex items-center justify-center"
      >
        <div className="text-center text-gray-800 px-6">
          <h2 className="text-5xl font-light mb-6 animate-fade-in-up text-gray-900">Two Hearts, One Love</h2>
          <p className="text-xl font-light animate-fade-in-up-delay text-gray-700 max-w-3xl mx-auto">
            Celebrating the beautiful union of traditions, cultures, and endless love
          </p>
        </div>
      </ParallaxSection>

      <section id="hindu-wedding" className="bg-white">
        <HinduWedding />
      </section>

      {/* Parallax Section 3 - Forever Together */}
      <ParallaxSection 
        backgroundImage="/images/traditional3.jpg"
        className="flex items-center justify-center"
      >
        <div className="text-center text-gray-800 px-6">
          <h2 className="text-5xl font-light mb-6 animate-fade-in-up text-gray-900">Forever Together</h2>
          <p className="text-xl font-light animate-fade-in-up-delay text-gray-700 max-w-3xl mx-auto">
            As we embark on this new chapter, we carry with us the blessings of family and friends
          </p>
        </div>
      </ParallaxSection>

      <section id="send-message" className="py-16 bg-white">
        <SendMessage />
      </section>

      <section id="faq" className="py-16 bg-gray-50">
        <FAQ />
      </section>

      <Toaster />
    </div>
  );
};

export default WeddingApp;