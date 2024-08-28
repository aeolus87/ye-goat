import React, { useState, useEffect } from 'react';
import yeBanner from '../assets/yebanner.png';
import { motion } from 'framer-motion';
import { FaChevronDown, FaHome } from 'react-icons/fa';

const Banner = ({ onExplore, onBack, bannerAnimations }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = yeBanner;
    preloadImage.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <motion.div {...bannerAnimations.container} className="h-screen relative overflow-hidden">
      {/* Loading spinner or placeholder until the image is fully loaded */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex justify-center items-center z-20 bg-black">
          <div className="text-white text-xl"></div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
      {imageLoaded && (
        <img
          src={yeBanner}
          alt="Kanye West Banner"
          className="absolute inset-0 w-full h-full object-cover lg:object-right"
        />
      )}
      {imageLoaded && (
        <motion.div {...bannerAnimations.content} className="absolute inset-0 flex items-center z-20">
          <div className="px-8 md:px-16 lg:px-24 w-full max-w-3xl">
            <motion.h2 {...bannerAnimations.text(0.6)} className="text-yellow-400 text-2xl font-bold mb-2">
              The Visionary Maestro
            </motion.h2>
            <motion.h1 {...bannerAnimations.text(0.8)} className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none">
              Ye
            </motion.h1>
            <motion.p {...bannerAnimations.text(1)} className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
              Discover the musical evolution of Kanye West, from his groundbreaking debut to his latest releases. Each album is a chapter in the story of one of hip-hop's most influential artists.
            </motion.p>
            <div className="flex space-y-4 space-y-0 space-x-4">
              <motion.button
                {...bannerAnimations.text()}
                onClick={onExplore}
                className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-yellow-500 transition duration-300"
              >
                Explore Albums <FaChevronDown className="ml-2" />
              </motion.button>
              <motion.button
                {...bannerAnimations.text()}
                onClick={onBack}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-white hover:text-black transition duration-300"
              >
                <FaHome />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Banner;
