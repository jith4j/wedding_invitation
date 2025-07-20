import React from 'react';
import { Button } from './ui/button';

const Navbar = ({ scrolled, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'christian-wedding', label: 'Christian Wedding' },
    { id: 'hindu-wedding', label: 'Hindu Wedding' },
    { id: 'send-message', label: 'Send a Message' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-serif text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            J & P
          </div>
          
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onNavigate(item.id)}
                className="text-gray-700 hover:text-rose-600 transition-colors duration-200"
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;