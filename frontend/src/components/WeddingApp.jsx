import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import InvitationCard from './InvitationCard';
import ChristianWedding from './ChristianWedding';
import HinduWedding from './HinduWedding';
import SendMessage from './SendMessage';
import FAQ from './FAQ';
import { Toaster } from './ui/toaster';

const WeddingApp = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} onNavigate={scrollToSection} />
      
      <section id="home">
        <HeroSection />
      </section>

      <section id="invitation" className="py-16 bg-gray-50">
        <InvitationCard />
      </section>

      <section id="christian-wedding" className="bg-gray-50">
        <ChristianWedding />
      </section>

      <section id="hindu-wedding" className="bg-gray-50">
        <HinduWedding />
      </section>

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