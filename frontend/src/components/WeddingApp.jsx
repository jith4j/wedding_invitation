import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import InvitationCard from './InvitationCard';
import ChristianWedding from './ChristianWedding';
import HinduWedding from './HinduWedding';
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
  const casualPhotos = [
    '/images/casual1.jpg',
    '/images/casual2.jpg',
    '/images/casual3.jpg',
    '/images/casual4.jpg',
    '/images/casual5.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % casualPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [casualPhotos.length]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Carousel with proper dimensions and centering */}
      <div className="relative w-80 h-96 mx-auto rounded-3xl overflow-hidden shadow-xl bg-gray-100 border border-gray-200">
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
        
        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
    </div>
  );
};

const WeddingApp = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the website
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

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
        backgroundImage="/images/traditional2.jpg"
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