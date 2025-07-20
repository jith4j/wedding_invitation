import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQ = () => {
  const faqItems = [
    {
      id: 'item-1',
      question: 'What is the dress code for both ceremonies?',
      answer: 'For the Christian wedding, formal western attire is preferred - suits for men and dresses or elegant outfits for women. For the Hindu wedding, traditional Indian attire is encouraged - sarees, lehengas, or salwar suits for women, and kurtas, sherwanis, or dhotis for men. Bright colors are welcome for the Hindu ceremony!'
    },
    {
      id: 'item-2',
      question: 'Can I bring a plus one?',
      answer: 'We would love to celebrate with you and your loved ones! Please specify the number of guests when you RSVP so we can ensure adequate arrangements. If your invitation specifically mentions "and guest" or family members, then yes! If not, please reach out to us directly.'
    },
    {
      id: 'item-3',
      question: 'Is there transportation between the two venues?',
      answer: 'Both ceremonies are in Kerala, but at different locations. The Christian wedding is at Madre De Deus Church in Vettucaud, and the Hindu wedding is at Al Saj Arena in Trivandrum. We recommend using the Google Maps links provided for directions. Local transportation and accommodation recommendations are available upon request.'
    },
    {
      id: 'item-4',
      question: 'Are children welcome at the ceremonies?',
      answer: 'Absolutely! We love having families celebrate with us. Both venues are child-friendly. Please do mention the number of children when you RSVP so we can make appropriate seating and meal arrangements.'
    },
    {
      id: 'item-5',
      question: 'What about dietary restrictions?',
      answer: 'We want everyone to enjoy the celebration! Please let us know about any dietary restrictions, allergies, or preferences when you RSVP. We will have vegetarian options available at both ceremonies, and can accommodate most special dietary needs with advance notice.'
    },
    {
      id: 'item-6',
      question: 'Can I take photos during the ceremonies?',
      answer: 'We would love for you to capture and share memories! Feel free to take photos during the reception and celebration portions. However, please be respectful during the actual ceremony proceedings. We will have professional photographers capturing the key moments to share with everyone later.'
    },
    {
      id: 'item-7',
      question: 'What if I can only attend one of the ceremonies?',
      answer: 'We completely understand! Please RSVP separately for each ceremony you plan to attend. Whether you can join us for one or both celebrations, your presence will make our day special.'
    },
    {
      id: 'item-8',
      question: 'Is there a gift registry?',
      answer: 'Your presence is the greatest gift of all! We are grateful to have you share in our joy. If you wish to honor us with a gift, a contribution toward our future together would be deeply appreciated, but it is certainly not expected.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Everything you need to know about our special celebrations
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-lg border-white/20 shadow-lg rounded-lg p-6">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqItems.map((item) => (
            <AccordionItem 
              key={item.id} 
              value={item.id}
              className="border border-gray-100 rounded-lg px-4 data-[state=open]:bg-gradient-to-r data-[state=open]:from-rose-50 data-[state=open]:to-purple-50"
            >
              <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-600 transition-colors duration-200">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg p-8 border border-rose-100">
          <h3 className="text-2xl font-serif text-gray-800 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            We're here to help! Don't hesitate to reach out if you need any additional information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <span>📧</span>
              <span>jithandpooja@wedding.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <span>📱</span>
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;