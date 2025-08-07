import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const UnifiedRSVP = () => {
  const [showRSVP, setShowRSVP] = useState(false);
  const [isSubmittingRSVP, setIsSubmittingRSVP] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    guests: '1',
    attending: '',
    ceremonies: ''
  });
  const { toast } = useToast();

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingRSVP(true);
    
    try {
      const ceremoniesToSubmit = [];
      
      // Determine which ceremonies to submit based on selection
      if (rsvpData.ceremonies === 'both') {
        ceremoniesToSubmit.push('Christian', 'Hindu');
      } else if (rsvpData.ceremonies === 'christian') {
        ceremoniesToSubmit.push('Christian');
      } else if (rsvpData.ceremonies === 'hindu') {
        ceremoniesToSubmit.push('Hindu');
      } else if (rsvpData.ceremonies === 'none') {
        // For 'none', we'll still submit but with attending: 'no'
        ceremoniesToSubmit.push('Christian'); // Just submit one entry marked as not attending
      }

      let allSuccess = true;
      let errorMessage = '';

      // Submit RSVP for each selected ceremony
      for (const ceremony of ceremoniesToSubmit) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/rsvp`,
            {
              ceremony: ceremony,
              name: rsvpData.name,
              email: rsvpData.email,
              attending: rsvpData.ceremonies === 'none' ? 'no' : rsvpData.attending,
              guests: rsvpData.ceremonies === 'none' ? '0' : rsvpData.guests
            }
          );

          if (!response.data.success) {
            allSuccess = false;
            errorMessage = response.data.message;
            break;
          }
        } catch (error) {
          console.error(`RSVP submission error for ${ceremony}:`, error);
          allSuccess = false;
          errorMessage = `Failed to submit RSVP for ${ceremony} ceremony`;
          break;
        }
      }

      if (allSuccess) {
        let successMessage = '';
        if (rsvpData.ceremonies === 'both') {
          successMessage = 'RSVP submitted successfully for both ceremonies!';
        } else if (rsvpData.ceremonies === 'christian') {
          successMessage = 'RSVP submitted successfully for Christian wedding!';
        } else if (rsvpData.ceremonies === 'hindu') {
          successMessage = 'RSVP submitted successfully for Hindu wedding!';
        } else if (rsvpData.ceremonies === 'none') {
          successMessage = 'Thank you for letting us know!';
        }

        toast({
          title: "RSVP Submitted Successfully!",
          description: successMessage,
        });
        setRsvpData({ name: '', email: '', guests: '1', attending: '', ceremonies: '' });
        setShowRSVP(false);
      } else {
        toast({
          title: "RSVP Submission Failed",
          description: errorMessage || "Please try again or contact us directly.",
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

  return (
    <>
      {/* RSVP Button Section */}
      <div className="text-center text-gray-800 px-6">
        <h2 className="text-5xl font-light mb-6 animate-fade-in-up text-gray-900">Join Our Celebration</h2>
        <p className="text-xl font-light mb-8 animate-fade-in-up-delay text-gray-700 max-w-3xl mx-auto">
          Your presence would make our special days even more meaningful
        </p>
        
        {/* Enhanced RSVP Button */}
        <div className="relative">
          <Button
            onClick={() => setShowRSVP(true)}
            className="bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 hover:from-rose-300 hover:via-pink-300 hover:to-purple-300 text-gray-800 border-0 font-medium py-8 px-16 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-xl"
          >
            <span className="flex items-center gap-3">
              <span>💌</span>
              <span>RSVP FOR OUR WEDDINGS</span>
            </span>
          </Button>
        </div>
        
        <p className="text-sm font-light text-gray-600 mt-4 animate-fade-in-up-delay">
          Let us know which ceremonies you'll be joining us for
        </p>
      </div>

      {/* RSVP Modal */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-light text-gray-900">RSVP - Wedding Celebrations</h3>
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
                <Label htmlFor="ceremonies" className="text-sm font-light text-gray-700">Which ceremonies will you attend?</Label>
                <Select value={rsvpData.ceremonies} onValueChange={(value) => setRsvpData({...rsvpData, ceremonies: value})}>
                  <SelectTrigger className="mt-2 border-gray-300 rounded-xl font-light focus:border-gray-400">
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both Christian (25th) and Hindu ceremonies (28th)</SelectItem>
                    <SelectItem value="christian">Only Christian wedding (25th)</SelectItem>
                    <SelectItem value="hindu">Only Hindu wedding (28th)</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {rsvpData.ceremonies && rsvpData.ceremonies !== 'none' && (
                <>
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

                  {rsvpData.attending === 'yes' && (
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
                  )}
                </>
              )}

              <Button 
                type="submit" 
                disabled={isSubmittingRSVP || !rsvpData.ceremonies || (rsvpData.ceremonies !== 'none' && !rsvpData.attending)}
                className="w-full bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 hover:from-rose-300 hover:via-pink-300 hover:to-purple-300 text-gray-800 border-0 py-3 text-sm font-medium rounded-xl disabled:opacity-50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isSubmittingRSVP ? "Submitting..." : "Submit RSVP"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UnifiedRSVP;