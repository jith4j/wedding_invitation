import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import emailjs from 'emailjs-com';

const SendMessage = () => {
  const [messageData, setMessageData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousMessages] = useState([
    {
      id: 1,
      name: 'Maneesha',
      message: 'Can\'t wait to be a part of your special day.',
      timestamp: '2 days ago'
    },
    {
      id: 2,
      name: 'Devika',
      message: 'I don\'t know how to express my happiness - I\'m so excited to see the wedding!',
      timestamp: '3 days ago'
    },
    {
      id: 3,
      name: 'Arjun',
      message: 'Feels like yesterday with the 3 of us on the same Bus for 4 years, We\'ve come a long way. Cannot wait to see you both getting hitched. To a lifetime of happiness.',
      timestamp: '5 days ago'
    }
  ]);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          guest_name: messageData.name,
          guest_email: messageData.email,
          guest_message: messageData.message
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS result:', result);
      
      toast({
        title: "Message sent successfully!",
        description: "Your heartfelt message has been delivered to Jith & Pooja.",
      });
      
      setMessageData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Message failed to send",
        description: "Please try again or contact the couple directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
          Send a Message
        </h2>
        <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
        <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Share your love, wishes, and excitement for Jith & Pooja's special day
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Message Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💌</span>
            </div>
            <h3 className="text-xl font-light text-gray-900">Write Your Message</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-3">Your Name</Label>
              <Input
                id="name"
                value={messageData.name}
                onChange={(e) => setMessageData({...messageData, name: e.target.value})}
                required
                className="w-full border-0 border-b-2 border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-light focus:border-gray-900 focus:ring-0 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div className="group">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-3">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={messageData.email}
                onChange={(e) => setMessageData({...messageData, email: e.target.value})}
                required
                className="w-full border-0 border-b-2 border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-light focus:border-gray-900 focus:ring-0 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="group">
              <Label htmlFor="message" className="text-sm font-medium text-gray-700 block mb-3">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Share your love, blessings, or favorite memory with the couple..."
                value={messageData.message}
                onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                className="w-full min-h-36 border-2 border-gray-200 rounded-2xl bg-transparent p-6 text-base font-light focus:border-gray-900 focus:ring-0 transition-colors resize-none"
                rows={6}
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 py-4 text-base font-light rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">✨</span>
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Previous Messages */}
        <div>
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="text-xl font-light text-gray-900">
              Messages from Loved Ones
            </h3>
          </div>
          
          <div className="space-y-6">
            {previousMessages.map((msg, index) => (
              <div key={msg.id} className={`bg-gradient-to-br ${
                index % 3 === 0 ? 'from-rose-50 to-pink-50' :
                index % 3 === 1 ? 'from-blue-50 to-indigo-50' :
                'from-green-50 to-emerald-50'
              } rounded-2xl p-8 border border-white/50 backdrop-blur-sm`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900 text-lg">{msg.name}</h4>
                  <span className="text-xs font-light text-gray-500 bg-white/60 px-3 py-1 rounded-full">{msg.timestamp}</span>
                </div>
                <p className="text-base font-light text-gray-700 leading-relaxed italic">"{msg.message}"</p>
              </div>
            ))}
            
            {/* See More Messages */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
              <div className="text-3xl mb-4">💕</div>
              <p className="text-base font-light text-gray-600 mb-4">And many more beautiful messages...</p>
              <Button variant="outline" className="text-gray-700 hover:text-gray-900 font-light border-gray-300 hover:border-gray-400 rounded-xl px-6 py-2">
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