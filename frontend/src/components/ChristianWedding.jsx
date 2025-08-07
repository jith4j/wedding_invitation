import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const ChristianWedding = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  // Removed RSVP state - now handled by unified RSVP component
  const [weatherData, setWeatherData] = useState({
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65
  });
  const { toast } = useToast();

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/weather/Vettucaud`
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
      const target = new Date('2025-08-25T11:00:00').getTime();
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
    const title = "Jith and Pooja - Christian Wedding";
    const details = "Join us for the Christian wedding ceremony at Madre De Deus Church, Vettucaud KL";
    const location = "Madre De Deus Church, Vettucaud, Kerala";
    const startDate = "20250825T053000Z"; // 11:00 AM IST = 05:30 AM UTC
    const endDate = "20250825T073000Z"; // 1:00 PM IST = 07:30 AM UTC
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleDirections = () => {
    const location = "Madre De Deus Church, Vettucaud, Kerala";
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
            {/* Church Image */}
            <div className="w-32 h-32 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-200">
              <img 
                src="/images/christian-img.png"
                alt="Church"
                className="w-40 h-20 object-cover rounded-lg opacity-70"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            Jith and Pooja - Christian Wedding
          </h1>
          
          <div className="text-base font-light text-gray-600 mb-8">
            <p>Monday, 25 August at 11:00am GMT+5:30</p>
            <p>Madre De Deus Church, Vettucaud KL</p>
          </div>
          
          {/* RSVP button removed - now handled by unified RSVP component */}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column - Wedding Details */}
          <div className="space-y-8">
            
            {/* Wedding Details Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="text-center mb-6">
                {/* <h3 className="text-xl font-light text-gray-900 mb-4">Sacred Union</h3> */}
                <div className="w-8 h-px bg-gray-300 mx-auto"></div>
              </div>
              <div className="space-y-4 text-center text-sm font-light text-gray-600">
                <p><span className="font-normal text-gray-900">Date:</span> Monday, August 25, 2025</p>
                <p><span className="font-normal text-gray-900">Time:</span> 11:00 AM</p>
                <p><span className="font-normal text-gray-900">Venue:</span> Madre De Deus Church</p>
                <p>Vettucaud, Kerala</p>
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
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    🗺️ <span>Get Directions</span>
                  </span>
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
                  <p className="text-xs font-light text-gray-500">Vettucaud</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RSVP count removed - unified RSVP section will show consolidated data */}

      </div>

      {/* RSVP Modal removed - now handled by unified RSVP component */}

    </div>
  );
};

export default ChristianWedding;