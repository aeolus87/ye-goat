import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import kanyeAwards from '../data/awards';

const AwardsTimeline = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Ye's Grammy Awards Timeline</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-black text-white rounded-md mt-2 hover:bg-gray-800 transition-colors"
        >
          yExit
        </button>
      </div>
      <div className="relative">
        {kanyeAwards.map((award, index) => (
          <motion.div
            key={index}
            className="timeline-item mb-8"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="timeline-content bg-white p-4 border border-gray-300 rounded-lg shadow-md">
              <span className="text-sm text-gray-500">{award.grammy} Grammy Awards</span>
              <h2 className="text-lg font-bold">{`${index + 1}. ${award.award}`}</h2>
              <p className="text-gray-700">{award.category}</p>
              <p className="text-gray-900">{award.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AwardsTimeline;
