import React, { useState } from 'react';
import { Button } from './ui/button';

const Navbar = ({ scrolled, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'our-journey', label: 'Our Journey' },
    { id: 'christian-wedding', label: 'Christian Wedding' },
    { id: 'hindu-wedding', label: 'Hindu Wedding' },
    { id: 'send-message', label: 'Send Message' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavigation = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm' 
          : 'bg-white/80'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-light text-gray-900">
            J & P
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onNavigate(item.id)}
                className="text-sm font-light text-gray-700 hover:text-gray-900 transition-colors duration-200 px-3 py-2 h-auto"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 p-2"
            >
              <svg 
                className={`h-5 w-5 transform transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavigation(item.id)}
                  className="block w-full text-left text-sm font-light text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;