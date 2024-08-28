// src/components/Homepage/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 }
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const MotionButton = motion.button;
const MotionLink = motion.a;

const HeroSection = ({ onDiscographyClick }) => (
  <motion.div 
    className="relative w-full lg:w-2/5 flex flex-col justify-center items-start text-white p-8 lg:p-16 h-full"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Header Section */}
    <motion.h1 
      className="absolute lg:top-40 top-16 text-4xl lg:text-5xl font-bold mb-8 lg:mb-2 flex flex-col"
      variants={textVariants}
    >
      <span className='text-yellow-400 text-8xl mr-4 font-normal pb-10'>ye</span> 
      <div className="font-extralight italic">The Greatest of <br /> All Time</div>
    </motion.h1>

    {/* Content Section */}
    <motion.div 
      className="absolute bottom-40 flex flex-col" // Adjust this margin-top to your preference
      variants={textVariants}
    >
      <motion.p 
        className="mb-8 text-lg"
      >
        Explore the artistry and influence of Kanye West, a visionary in music and fashion.
      </motion.p>
      <div className="flex gap-4">
        <MotionButton 
          className="px-8 py-3 text-lg bg-white text-black rounded-full hover:bg-yellow-400 transition duration-300 shadow-lg"
          onClick={onDiscographyClick}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Discography
        </MotionButton>
        <MotionLink 
          href="https://www.yeezy.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-8 py-3 text-lg bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 shadow-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Merch
        </MotionLink>
      </div>
    </motion.div>
  </motion.div>
);

export default HeroSection;
