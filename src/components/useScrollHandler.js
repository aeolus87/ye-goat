// useScrollHandler.js
import { useState, useEffect, useCallback, useRef } from 'react';

const useScrollHandler = (albums) => {
  const [currentAlbum, setCurrentAlbum] = useState(-1);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef(null);

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      cancelAnimationFrame(scrollTimeout.current);
    }

    scrollTimeout.current = requestAnimationFrame(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition < windowHeight) {
        setCurrentAlbum(-1);
      } else {
        const newCurrentAlbum = Math.round((scrollPosition - windowHeight) / windowHeight);
        setCurrentAlbum(newCurrentAlbum);
      }

      lastScrollTop.current = scrollPosition;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        cancelAnimationFrame(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  const scrollToAlbum = useCallback((index) => {
    window.scrollTo({
      top: window.innerHeight * (index + 1),
      behavior: 'smooth'
    });
  }, []);

  const scrollToDiscography = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }, []);

  return { currentAlbum, scrollToAlbum, scrollToDiscography };
};

export default useScrollHandler;