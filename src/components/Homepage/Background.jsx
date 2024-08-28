import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import kanyeBackground from '../../assets/yehp.jpg';

const backgroundVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

const Background = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = kanyeBackground;
    preloadImage.onload = () => setImageLoaded(true);
  }, []);

  return (
    <>
      {!imageLoaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-black z-20">
        </div>
      )}

      {imageLoaded && (
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${kanyeBackground})` }}
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
        />
      )}

      {imageLoaded && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
    </>
  );
};

export default Background;
