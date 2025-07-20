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
      answer: 'For the Christian wedding, formal western attire is preferred. For the Hindu wedding, traditional Indian attire is encouraged. Bright colors are welcome for the Hindu ceremony.'
    },
    {
      id: 'item-2',
      question: 'Can I bring a plus one?',
      answer: 'Please specify the number of guests when you RSVP so we can ensure adequate arrangements. If your invitation specifically mentions additional guests, then yes.'
    },
    {
      id: 'item-3',
      question: 'Is there transportation between the two venues?',
      answer: 'Both ceremonies are in Kerala, but at different locations. We recommend using the Google Maps links provided for directions. Local transportation recommendations are available upon request.'
    },
    {
      id: 'item-4',
      question: 'Are children welcome at the ceremonies?',
      answer: 'Absolutely. We love having families celebrate with us. Both venues are child-friendly. Please mention the number of children when you RSVP.'
    },
    {
      id: 'item-5',
      question: 'What about dietary restrictions?',
      answer: 'Please let us know about any dietary restrictions when you RSVP. We will have vegetarian options available at both ceremonies, and can accommodate most special dietary needs.'
    },
    {
      id: 'item-6',
      question: 'Can I take photos during the ceremonies?',
      answer: 'Feel free to take photos during the reception portions. Please be respectful during the actual ceremony proceedings. We will have professional photographers capturing key moments.'
    },
    {
      id: 'item-7',
      question: 'What if I can only attend one ceremony?',
      answer: 'We completely understand. Please RSVP separately for each ceremony you plan to attend. Whether you join us for one or both celebrations, your presence will make our day special.'
    },
    {
      id: 'item-8',
      question: 'Is there a gift registry?',
      answer: 'Your presence is the greatest gift. If you wish to honor us with a gift, a contribution toward our future together would be deeply appreciated, but it is not expected.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="w-12 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-base font-light text-gray-600">
          Everything you need to know about our celebrations
        </p>
      </div>

      <div className="bg-white border border-gray-100">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={item.id} 
              value={item.id}
              className={`px-8 py-2 ${index !== faqItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <AccordionTrigger className="text-left font-light text-gray-900 hover:text-gray-700 transition-colors duration-200 text-base py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 font-light leading-relaxed pb-6 text-sm">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center">
        <div className="bg-gray-50 border border-gray-100 p-8">
          <h3 className="text-lg font-light text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-sm font-light text-gray-600 mb-6">
            We're here to help. Don't hesitate to reach out if you need any additional information.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm font-light text-gray-700">
            <div>jithandpooja@wedding.com</div>
            <div>+91 98765 43210</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;