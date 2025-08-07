import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const HinduWedding = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  // Removed RSVP state - now handled by unified RSVP component
  const [weatherData, setWeatherData] = useState({
    temp: 30,
    condition: 'Sunny',
    humidity: 70
  });
  const { toast } = useToast();

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/weather/Trivandrum`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Weather fetch error:', error);
        // Keep default weather data on error
      }
    };
    
    fetchWeather();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date('2025-08-28T10:15:00').getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Removed handleRSVPSubmit - now handled by unified RSVP component

  const handleCalendarAdd = () => {
    const title = "Jith and Pooja - Hindu Wedding (Muhurtham)";
    const details = "Join us for the Hindu wedding ceremony at Al Saj Arena, Trivandrum KL";
    const location = "Al Saj Arena, Trivandrum, Kerala";
    const startDate = "20250828T044500Z"; // 10:15 AM IST = 04:45 AM UTC
    const endDate = "20250828T051500Z"; // 10:45 AM IST = 05:15 AM UTC
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleDirections = () => {
    const location = "Al Saj Arena, Trivandrum, Kerala";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleSendMessage = () => {
    document.getElementById('send-message').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            {/* Temple Image */}
            <div className="w-32 h-32 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-200">
              <img 
                src="/images/hindu-img.png"
                alt="Temple"
                className="w-40 h-20 object-cover rounded-lg opacity-70"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            Jith and Pooja - Hindu Wedding
          </h1>
          
          <div className="text-base font-light text-gray-600 mb-8">
            <p>Thursday, 28 August at 10:15am GMT+5:30</p>
            <p>Al Saj Arena, Trivandrum KL</p>
          </div>
          
          {/* Enhanced RSVP Button with Gradient */}
          <div className="relative">
            <Button
              onClick={() => setShowRSVP(true)}
              className="bg-gradient-to-r from-orange-200 via-yellow-200 to-amber-200 hover:from-orange-300 hover:via-yellow-300 hover:to-amber-300 text-gray-800 border-0 font-medium py-6 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">RSVP NOW</span>
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column - Wedding Details */}
          <div className="space-y-8">
            
            {/* Wedding Details Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🕉️</div>
                {/* <h3 className="text-xl font-light text-gray-900 mb-4">Vivah Sanskar</h3> */}
                <div className="w-8 h-px bg-gray-300 mx-auto"></div>
              </div>
              <div className="space-y-4 text-center text-sm font-light text-gray-600">
                <p><span className="font-normal text-gray-900">Date:</span> Thursday, August 28, 2025</p>
                <p><span className="font-normal text-gray-900">Muhurtham:</span> 10:15 AM - 10:45 AM</p>
                <p><span className="font-normal text-gray-900">Venue:</span> Al Saj Arena</p>
                <p>Trivandrum, Kerala</p>
              </div>

              <div className="flex gap-4 mt-8">
                <Button 
                  onClick={handleCalendarAdd}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 font-light py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  📅 Calendar
                </Button>
                <Button 
                  onClick={handleDirections}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 font-light py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  🗺️ Directions
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Weather & Location (Side by Side) */}
          <div className="space-y-8">
            
            {/* Weather & Location Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Weather Card - Compact */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h4 className="text-sm font-light text-gray-900 mb-3 text-center">Weather</h4>
                <div className="text-center">
                  <p className="text-2xl font-light text-gray-900 mb-1">{weatherData.temp}°C</p>
                  <p className="text-xs font-light text-gray-600">{weatherData.condition}</p>
                  <p className="text-xs font-light text-gray-500">Humidity: {weatherData.humidity}%</p>
                </div>
              </div>

              {/* Location Card - Compact */}
              <div 
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={handleDirections}
              >
                <h4 className="text-sm font-light text-gray-900 mb-3 text-center">Location</h4>
                <div className="text-center">
                  <div className="text-2xl mb-2">📍</div>
                  <p className="text-xs font-light text-gray-600">Click for Maps</p>
                  <p className="text-xs font-light text-gray-500">Trivandrum</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RSVP Status */}
        <div className="mt-16 text-center">
          <div className="bg-gray-100 border border-gray-200 rounded-2xl p-6 inline-block">
            <p className="text-gray-700 font-light">6 Going • 2 Maybe</p>
          </div>
        </div>

      </div>

      {/* RSVP Modal */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-light text-gray-900">RSVP - Hindu Wedding</h3>
              <Button
                onClick={() => setShowRSVP(false)}
                variant="ghost"
                className="p-2 hover:bg-gray-100 hover:text-gray-600 rounded-full transition-colors"
              >
                ✕
              </Button>
            </div>
            
            <form onSubmit={handleRSVPSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-light text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  value={rsvpData.name}
                  onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})}
                  required
                  className="mt-2 border-gray-300 rounded-xl font-light focus:border-gray-400 focus:ring-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-light text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={rsvpData.email}
                  onChange={(e) => setRsvpData({...rsvpData, email: e.target.value})}
                  required
                  className="mt-2 border-gray-300 rounded-xl font-light focus:border-gray-400 focus:ring-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="guests" className="text-sm font-light text-gray-700">Number of Guests</Label>
                <Select value={rsvpData.guests} onValueChange={(value) => setRsvpData({...rsvpData, guests: value})}>
                  <SelectTrigger className="mt-2 border-gray-300 rounded-xl font-light focus:border-gray-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="attending" className="text-sm font-light text-gray-700">Will you attend?</Label>
                <Select value={rsvpData.attending} onValueChange={(value) => setRsvpData({...rsvpData, attending: value})}>
                  <SelectTrigger className="mt-2 border-gray-300 rounded-xl font-light focus:border-gray-400">
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmittingRSVP}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 py-3 text-sm font-light rounded-xl disabled:opacity-50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isSubmittingRSVP ? "Submitting..." : "Submit RSVP"}
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default HinduWedding;