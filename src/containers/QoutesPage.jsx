import React, { useState, useEffect } from 'react';
import kanyeQuotesImage from '../assets/yepaper.png';
import kanyeQuotes from '../data/quotesData';

const QuotesPage = () => {
  const [quote, setQuote] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const selectedQuote = kanyeQuotes[quoteIndex];
    setQuote(selectedQuote);
  }, [quoteIndex]);

  const handleNextQuote = () => {
    setQuoteIndex((prevIndex) => (prevIndex + 1) % kanyeQuotes.length);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center p-4 pt-16 lg:pt-32">
      <div className="w-full max-w-7xl mx-auto relative ">
        <div className="w-full lg:w-1/2 relative">
          <img 
            src={kanyeQuotesImage} 
            alt="Kanye West holding yellow paper" 
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="w-full lg:w-1/2 absolute top-4/5 lg:top-1/2 lg:right-0 lg:transform lg:-translate-y-1/2">
          <div className="lg:min-h-80 min-h-72 bg-yellow-400 text-black rounded-lg shadow-lg p-6 lg:p-8 mx-4 mb-4 lg:mx-0 lg:mb-0 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-6">ye Quotes</h1>
              <p className="text-lg lg:text-2xl italic mb-4 lg:mb-8">{quote}</p>
            </div>
            <button 
              onClick={handleNextQuote} 
              className="w-full px-4 py-2 lg:px-8 lg:py-4 bg-black text-yellow-400 rounded-full hover:bg-gray-800 transition duration-300 text-sm lg:text-lg font-semibold mt-auto"
            >
              Next Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesPage;