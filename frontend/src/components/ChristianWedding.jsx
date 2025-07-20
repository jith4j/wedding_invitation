import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';

const ChristianWedding = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    guests: '1',
    attendance: '',
    dietary: ''
  });
  const [weatherData] = useState({
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65
  });
  const { toast } = useToast();

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

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    console.log('RSVP Data:', rsvpData);
    toast({
      title: "RSVP Submitted",
      description: "Thank you for your response. We look forward to celebrating with you.",
    });
    setRsvpData({ name: '', email: '', guests: '1', attendance: '', dietary: '' });
  };

  const handleCalendarAdd = () => {
    alert('Calendar integration will be implemented with Google Calendar API');
  };

  const handleDirections = () => {
    alert('Google Maps directions will open here');
  };

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
          Christian Wedding
        </h2>
        <div className="w-12 h-px bg-gray-300 mx-auto"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Column - Wedding Details */}
        <div className="space-y-12">
          {/* Countdown */}
          <div className="text-center">
            <h3 className="text-sm font-light text-gray-600 mb-6 tracking-wide uppercase">
              Time Until Ceremony
            </h3>
            <div className="flex justify-center gap-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-2xl font-light text-gray-900 mb-1">{value}</div>
                  <div className="text-xs font-light text-gray-500 uppercase tracking-wide">{unit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wedding Details */}
          <div className="bg-white border border-gray-100 p-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-light text-gray-900">Sacred Union</h3>
              <div className="space-y-2 text-sm font-light text-gray-600">
                <p><span className="font-normal">Date:</span> Monday, August 25, 2025</p>
                <p><span className="font-normal">Time:</span> 11:00 AM</p>
                <p><span className="font-normal">Venue:</span> Madre De Deus Church</p>
                <p>Vettucaud, Kerala</p>
              </div>

              <div className="pt-6 space-y-3">
                <Button 
                  onClick={handleCalendarAdd}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light rounded-none"
                >
                  Add to Calendar
                </Button>
                <Button 
                  onClick={handleDirections}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-light rounded-none"
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>

          {/* Weather */}
          <div className="bg-white border border-gray-100 p-6">
            <h4 className="text-sm font-light text-gray-900 mb-4 uppercase tracking-wide">Weather Forecast</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-light text-gray-900">{weatherData.temp}°C</p>
                <p className="text-sm font-light text-gray-600">{weatherData.condition}</p>
              </div>
              <div className="text-2xl">⛅</div>
            </div>
            <p className="text-xs font-light text-gray-500 mt-2">Humidity: {weatherData.humidity}%</p>
          </div>

          {/* Maps Placeholder */}
          <div className="bg-gray-50 border border-gray-100 h-48 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">📍</div>
              <p className="text-sm font-light">Google Maps Integration</p>
              <p className="text-xs font-light">Madre De Deus Church, Vettucaud</p>
            </div>
          </div>
        </div>

        {/* Right Column - RSVP Form */}
        <div>
          <div className="bg-white border border-gray-100 p-8 sticky top-24">
            <h3 className="text-xl font-light text-gray-900 mb-8 text-center">
              RSVP
            </h3>
            
            <form onSubmit={handleRSVPSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-light text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  value={rsvpData.name}
                  onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})}
                  required
                  className="mt-2 border-gray-200 rounded-none font-light"
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
                  className="mt-2 border-gray-200 rounded-none font-light"
                />
              </div>

              <div>
                <Label htmlFor="guests" className="text-sm font-light text-gray-700">Number of Guests</Label>
                <Select value={rsvpData.guests} onValueChange={(value) => setRsvpData({...rsvpData, guests: value})}>
                  <SelectTrigger className="mt-2 border-gray-200 rounded-none font-light">
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
                  <SelectTrigger className="mt-2 border-gray-200 rounded-none font-light">
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
                  placeholder="Any dietary restrictions or preferences..."
                  value={rsvpData.dietary}
                  onChange={(e) => setRsvpData({...rsvpData, dietary: e.target.value})}
                  className="mt-2 border-gray-200 rounded-none font-light"
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-sm font-light rounded-none transition-colors duration-200"
              >
                Submit RSVP
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChristianWedding;