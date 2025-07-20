import React from 'react';
import { Button } from './ui/button';

const Navbar = ({ scrolled, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'christian-wedding', label: 'Christian Wedding' },
    { id: 'hindu-wedding', label: 'Hindu Wedding' },
    { id: 'send-message', label: 'Send Message' },
    { id: 'faq', label: 'FAQ' },
  ];

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

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 p-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;