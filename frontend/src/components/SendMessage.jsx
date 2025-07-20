import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
      message: 'We are so excited to celebrate your special day! Wishing you both endless love and happiness. ❤️',
      timestamp: '2 days ago'
    },
    {
      id: 2,
      name: 'The Sharma Family',
      message: 'Congratulations on this beautiful union! May your marriage be filled with joy, laughter, and countless blessings. 🎉',
      timestamp: '3 days ago'
    },
    {
      id: 3,
      name: 'Maya',
      message: 'Two hearts becoming one! So happy for you both. Can\'t wait to witness this magical day! ✨',
      timestamp: '5 days ago'
    }
  ]);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock message submission
    console.log('Message data:', messageData);
    toast({
      title: "Message sent with love! 💌",
      description: "Your heartfelt message has been delivered to Jith & Pooja. Thank you for sharing in their joy!",
    });
    setMessageData({ name: '', email: '', message: '' });
  };

  const addEmoji = (emoji) => {
    setMessageData({
      ...messageData,
      message: messageData.message + emoji
    });
  };

  const popularEmojis = ['❤️', '💕', '🎉', '✨', '🥳', '💒', '👰', '🤵', '🌸', '🎊', '💐', '🍾'];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          Send a Message to the Couple
        </h2>
        <p className="text-lg text-gray-600">
          Share your love, wishes, and excitement for Jith & Pooja's special day
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Message Form */}
        <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-center text-rose-600">
              Write Your Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={messageData.name}
                  onChange={(e) => setMessageData({...messageData, name: e.target.value})}
                  required
                  className="mt-1"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={messageData.email}
                  onChange={(e) => setMessageData({...messageData, email: e.target.value})}
                  required
                  className="mt-1"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Share your love, blessings, or favorite memory with the couple..."
                  value={messageData.message}
                  onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                  className="mt-1 min-h-32"
                  rows={6}
                  required
                />
              </div>

              {/* Emoji Picker */}
              <div>
                <Label>Add some love with emojis</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularEmojis.map((emoji, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addEmoji(emoji)}
                      className="hover:bg-rose-50 hover:border-rose-200"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white py-3 text-lg font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Send Message with Love 💌
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Previous Messages */}
        <div>
          <h3 className="text-2xl font-serif text-center mb-6 text-gray-800">
            Messages from Loved Ones
          </h3>
          <div className="space-y-4">
            {previousMessages.map((msg) => (
              <Card key={msg.id} className="bg-gradient-to-r from-rose-50 to-purple-50 border-rose-100 shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{msg.name}</h4>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{msg.message}</p>
                </CardContent>
              </Card>
            ))}
            
            {/* See More Messages Placeholder */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">💕</div>
                <p className="text-gray-600">And many more beautiful messages...</p>
                <Button variant="ghost" className="mt-2 text-rose-600 hover:text-rose-700">
                  View All Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;