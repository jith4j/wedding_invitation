import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const HinduWedding = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [showRSVP, setShowRSVP] = useState(false);
  const [isSubmittingRSVP, setIsSubmittingRSVP] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    guests: '1',
    attendance: '',
    dietary: ''
  });
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

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingRSVP(true);
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/rsvp`,
        {
          ceremony: 'Hindu',
          name: rsvpData.name,
          email: rsvpData.email,
          attending: rsvpData.attendance,
          guests: rsvpData.guests,
          dietary: rsvpData.dietary
        }
      );

      if (response.data.success) {
        toast({
          title: "RSVP Submitted Successfully!",
          description: response.data.message,
        });
        setRsvpData({ name: '', email: '', guests: '1', attendance: '', dietary: '' });
        setShowRSVP(false);
      } else {
        toast({
          title: "RSVP Submission Failed",
          description: response.data.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      toast({
        title: "RSVP Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingRSVP(false);
    }
  };

  const handleCalendarAdd = () => {
    const title = "Jith and Pooja - Hindu Wedding (Muhurtham)";
    const details = "Join us for the Hindu wedding ceremony (Vivah Sanskar) at Al Saj Arena, Trivandrum KL";
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
      <div className="max-w-lg mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-6">
            {/* Couple Illustration Placeholder */}
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-6xl">🕉️</div>
            </div>
          </div>
          
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            Jith and Pooja - Hindu Wedding
          </h1>
          
          <div className="text-sm font-light text-gray-600 mb-6">
            <p>Thu 28 August at 10:15am GMT+5:30</p>
            <p>Muhurtham: 10:15 AM - 10:45 AM</p>
            <p>Al Saj Arena, Trivandrum KL</p>
          </div>
          
          {/* Apple-style Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <Button
              onClick={handleSendMessage}
              className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-800 text-white font-light py-4 rounded-2xl transition-all duration-200"
            >
              <span className="mr-2">💬</span>
              Send a Note
            </Button>
            <Button
              onClick={() => setShowRSVP(true)}
              className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-800 text-white font-light py-4 rounded-2xl transition-all duration-200"
            >
              <span className="mr-2">📤</span>
              RSVP
            </Button>
          </div>
          
          {/* Host Section */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 mb-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">💑</span>
              </div>
              <div className="text-left">
                <p className="text-white font-light text-sm">Hosted by Jith & Pooja</p>
                <p className="text-gray-300 font-light text-xs">Join us in celebrating our union</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cards */}
        <div className="space-y-4">
          
          {/* Countdown Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-light text-gray-900 mb-4 text-center">
              Time Until Muhurtham
            </h3>
            <div className="flex justify-center gap-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-2xl font-light text-gray-900 mb-1">{value}</div>
                  <div className="text-xs font-light text-gray-500 uppercase">{unit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wedding Details Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🕉️</div>
              <h3 className="text-lg font-light text-gray-900">Vivah Sanskar</h3>
            </div>
            <div className="space-y-3 text-center text-sm font-light text-gray-600">
              <p><span className="font-normal text-gray-900">Date:</span> Thursday, August 28, 2025</p>
              <p><span className="font-normal text-gray-900">Muhurtham:</span> 10:15 AM - 10:45 AM</p>
              <p><span className="font-normal text-gray-900">Venue:</span> Al Saj Arena</p>
              <p>Trivandrum, Kerala</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button 
                onClick={handleCalendarAdd}
                className="bg-gray-900 hover:bg-gray-800 text-white font-light py-3 rounded-xl"
              >
                📅 Calendar
              </Button>
              <Button 
                onClick={handleDirections}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-light py-3 rounded-xl"
              >
                🗺️ Directions
              </Button>
            </div>
          </div>

          {/* Weather Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-lg font-light text-gray-900 mb-4">Weather Forecast</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-light text-gray-900">{weatherData.temp}°C</p>
                <p className="text-sm font-light text-gray-600">{weatherData.condition}</p>
                <p className="text-xs font-light text-gray-500">Humidity: {weatherData.humidity}%</p>
              </div>
              <div className="text-4xl">☀️</div>
            </div>
          </div>

          {/* Maps Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-lg font-light text-gray-900 mb-4">Location</h4>
            <div 
              className="bg-gray-50 rounded-xl h-32 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={handleDirections}
            >
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">📍</div>
                <p className="text-sm font-light">Click for Google Maps</p>
                <p className="text-xs font-light">Al Saj Arena, Trivandrum</p>
              </div>
            </div>
          </div>

        </div>

        {/* RSVP Status */}
        <div className="mt-8 text-center">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-white font-light text-sm">6 Going • 2 Maybe</p>
          </div>
        </div>

      </div>

      {/* RSVP Modal */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-light text-gray-900">RSVP - Hindu Wedding</h3>
              <Button
                onClick={() => setShowRSVP(false)}
                variant="ghost"
                className="p-2"
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
                  className="mt-2 border-gray-200 rounded-xl font-light"
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
                  className="mt-2 border-gray-200 rounded-xl font-light"
                />
              </div>

              <div>
                <Label htmlFor="guests" className="text-sm font-light text-gray-700">Number of Guests</Label>
                <Select value={rsvpData.guests} onValueChange={(value) => setRsvpData({...rsvpData, guests: value})}>
                  <SelectTrigger className="mt-2 border-gray-200 rounded-xl font-light">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="attendance" className="text-sm font-light text-gray-700">Will you attend?</Label>
                <Select value={rsvpData.attendance} onValueChange={(value) => setRsvpData({...rsvpData, attendance: value})}>
                  <SelectTrigger className="mt-2 border-gray-200 rounded-xl font-light">
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, I'll be there</SelectItem>
                    <SelectItem value="no">Sorry, can't make it</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dietary" className="text-sm font-light text-gray-700">Dietary Preferences</Label>
                <Textarea
                  id="dietary"
                  placeholder="Any dietary restrictions..."
                  value={rsvpData.dietary}
                  onChange={(e) => setRsvpData({...rsvpData, dietary: e.target.value})}
                  className="mt-2 border-gray-200 rounded-xl font-light"
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmittingRSVP}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-sm font-light rounded-xl disabled:opacity-50"
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