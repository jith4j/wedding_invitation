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

const ParallaxSection = ({ children, className = "" }) => {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Parallax background - you can add photos here later */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-parallax-slow"></div>
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="relative z-10">
        {children}
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

      {/* Parallax Section 1 */}
      <ParallaxSection className="flex items-center justify-center">
        <div className="text-center text-gray-800">
          <h2 className="text-4xl font-light mb-4 animate-fade-in-up">Our Journey</h2>
          <p className="text-lg font-light animate-fade-in-up-delay">Save the date photos coming soon...</p>
        </div>
      </ParallaxSection>

      <section id="christian-wedding" className="bg-white">
        <ChristianWedding />
      </section>

      {/* Parallax Section 2 */}
      <ParallaxSection className="flex items-center justify-center">
        <div className="text-center text-gray-800">
          <h2 className="text-4xl font-light mb-4 animate-fade-in-up">Two Hearts, One Love</h2>
          <p className="text-lg font-light animate-fade-in-up-delay">More photos coming soon...</p>
        </div>
      </ParallaxSection>

      <section id="hindu-wedding" className="bg-white">
        <HinduWedding />
      </section>

      {/* Parallax Section 3 */}
      <ParallaxSection className="flex items-center justify-center">
        <div className="text-center text-gray-800">
          <h2 className="text-4xl font-light mb-4 animate-fade-in-up">Forever Together</h2>
          <p className="text-lg font-light animate-fade-in-up-delay">Wedding moments coming soon...</p>
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