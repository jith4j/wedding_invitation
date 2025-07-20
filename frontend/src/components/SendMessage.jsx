import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const SendMessage = () => {
  const [messageData, setMessageData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [previousMessages] = useState([
    {
      id: 1,
      name: 'Sarah & John',
      message: 'We are so excited to celebrate your special day. Wishing you both endless love and happiness.',
      timestamp: '2 days ago'
    },
    {
      id: 2,
      name: 'The Sharma Family',
      message: 'Congratulations on this beautiful union. May your marriage be filled with joy, laughter, and countless blessings.',
      timestamp: '3 days ago'
    },
    {
      id: 3,
      name: 'Maya',
      message: 'Two hearts becoming one. So happy for you both. Can\'t wait to witness this magical day.',
      timestamp: '5 days ago'
    }
  ]);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message data:', messageData);
    toast({
      title: "Message sent",
      description: "Your heartfelt message has been delivered to Jith & Pooja.",
    });
    setMessageData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
          Send a Message
        </h2>
        <div className="w-12 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-base font-light text-gray-600 max-w-xl mx-auto">
          Share your love, wishes, and excitement for Jith & Pooja's special day
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Message Form */}
        <div className="bg-white border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-light text-gray-700">Your Name</Label>
              <Input
                id="name"
                value={messageData.name}
                onChange={(e) => setMessageData({...messageData, name: e.target.value})}
                required
                className="mt-2 border-gray-200 rounded-none font-light"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-light text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={messageData.email}
                onChange={(e) => setMessageData({...messageData, email: e.target.value})}
                required
                className="mt-2 border-gray-200 rounded-none font-light"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-light text-gray-700">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Share your love, blessings, or favorite memory with the couple..."
                value={messageData.message}
                onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                className="mt-2 min-h-32 border-gray-200 rounded-none font-light"
                rows={6}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-sm font-light rounded-none transition-colors duration-200"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Previous Messages */}
        <div>
          <h3 className="text-lg font-light text-gray-900 mb-8">
            Messages from Loved Ones
          </h3>
          <div className="space-y-6">
            {previousMessages.map((msg) => (
              <div key={msg.id} className="bg-white border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-light text-gray-900">{msg.name}</h4>
                  <span className="text-xs font-light text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-sm font-light text-gray-600 leading-relaxed">{msg.message}</p>
              </div>
            ))}
            
            {/* See More Messages */}
            <div className="bg-gray-50 border border-gray-100 p-6 text-center">
              <p className="text-sm font-light text-gray-600 mb-3">And many more beautiful messages...</p>
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-light">
                View All Messages
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;