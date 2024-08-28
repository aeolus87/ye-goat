import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const KanyeNewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
      const url = `https://gnews.io/api/v4/search?q=(Kanye West OR Ye OR Yeezy) NOT "Taylor Swift"&lang=en&country=us&max=10&apikey=${apiKey}`;

      try {
        const response = await axios.get(url);
        setNews(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news. Please try again later.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (deltaX > 50) {
        prevSlide();
      } else if (deltaX < -50) {
        nextSlide();
      }
    }
    setTouchStartX(null);
  };

  if (loading)
    return <div className="text-center text-white py-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;

  const getArticleIndex = (offset) =>
    (currentIndex + offset + news.length) % news.length;

  return (
    <div
      className="bg-black py-12 px-4 sm:px-6 lg:px-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-yellow-400 text-3xl md:text-4xl font-bold mb-8 text-center">
        Latest Ye News
      </h2>
      <div className="relative max-w-5xl mx-auto">
        <motion.div className="flex justify-center items-center space-x-4">
          {[-1, 0, 1].map((offset) => {
            const index = getArticleIndex(offset);
            const article = news[index];
            return (
              <AnimatePresence key={index} mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg ${
                    offset === 0
                      ? "w-80 transform scale-110 z-10"
                      : "w-64 opacity-60"
                  }`}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    {offset === 0 && (
                      <>
                        <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                          {article.description}
                        </p>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full hover:bg-yellow-300 transition duration-300"
                        >
                          Read More
                        </a>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </motion.div>

        {!isMobile && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition duration-300"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition duration-300"
            >
              <FaChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      <div className="text-center mt-6 text-gray-400">
        {currentIndex + 1} / {news.length}
      </div>
    </div>
  );
};

export default KanyeNewsPage;
