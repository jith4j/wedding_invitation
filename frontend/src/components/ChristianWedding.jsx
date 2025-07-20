import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
    humidity: 65,
    icon: '⛅'
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
    // Mock RSVP submission
    console.log('RSVP Data:', rsvpData);
    toast({
      title: "RSVP Submitted!",
      description: "Thank you for your response. We can't wait to celebrate with you! 💒",
    });
    setRsvpData({ name: '', email: '', guests: '1', attendance: '', dietary: '' });
  };

  const handleCalendarAdd = () => {
    // Mock calendar integration
    alert('Calendar integration will be implemented with Google Calendar API');
  };

  const handleDirections = () => {
    // Mock directions
    alert('Google Maps directions will open here');
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-serif text-center mb-12 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
        Christian Wedding
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Wedding Details */}
        <div className="space-y-6">
          {/* Mini Countdown */}
          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-serif text-center mb-4 text-rose-600">Time Until Ceremony</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-rose-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-rose-600">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">{unit}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wedding Invitation Card */}
          <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-1 bg-rose-400 mx-auto mb-3"></div>
                <h3 className="font-serif text-3xl text-gray-800 mb-2">Sacred Union</h3>
                <div className="w-10 h-1 bg-rose-400 mx-auto"></div>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <p className="text-lg"><strong>Date:</strong> Monday, August 25th, 2025</p>
                <p className="text-lg"><strong>Time:</strong> 11:00 AM</p>
                <p className="text-lg"><strong>Venue:</strong></p>
                <p className="font-medium">Madre De Deus Church</p>
                <p>Vettucaud, Kerala</p>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  onClick={handleCalendarAdd}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                >
                  📅 Add to Calendar
                </Button>
                <Button 
                  onClick={handleDirections}
                  variant="outline"
                  className="w-full border-rose-300 text-rose-600 hover:bg-rose-50"
                >
                  🗺️ Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card className="bg-blue-50 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-600 flex items-center gap-2">
                🌤️ Weather Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-700">{weatherData.temp}°C</p>
                  <p className="text-blue-600">{weatherData.condition}</p>
                </div>
                <div className="text-4xl">{weatherData.icon}</div>
              </div>
              <p className="text-sm text-blue-600 mt-2">Humidity: {weatherData.humidity}%</p>
            </CardContent>
          </Card>

          {/* Google Maps Embed Placeholder */}
          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
            <CardContent className="p-0">
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p>Google Maps will be embedded here</p>
                  <p className="text-sm">Madre De Deus Church, Vettucaud</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - RSVP Form */}
        <div>
          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-center text-rose-600">
                RSVP - Christian Wedding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRSVPSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({...rsvpData, email: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={rsvpData.guests} onValueChange={(value) => setRsvpData({...rsvpData, guests: value})}>
                    <SelectTrigger className="mt-1">
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
                  <Label htmlFor="attendance">Will you attend?</Label>
                  <Select value={rsvpData.attendance} onValueChange={(value) => setRsvpData({...rsvpData, attendance: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I'll be there! ✨</SelectItem>
                      <SelectItem value="no">Sorry, can't make it 😔</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dietary">Dietary Preferences</Label>
                  <Textarea
                    id="dietary"
                    placeholder="Any dietary restrictions or preferences..."
                    value={rsvpData.dietary}
                    onChange={(e) => setRsvpData({...rsvpData, dietary: e.target.value})}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-3 text-lg font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Submit RSVP ✨
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChristianWedding;