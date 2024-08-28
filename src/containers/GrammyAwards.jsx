import React from "react";
import { useNavigate } from "react-router-dom";
import yeAwardImage from "../assets/yeaward.png";

const GrammyAwards = () => {
  const navigate = useNavigate();

  const handleExploreAwards = () => {
    navigate("/awards");
  };

  return (
    <div className="bg-black text-white lg:min-h-screen flex flex-col lg:flex-row relative">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-20">
        <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-yellow-400">
          24 Grammys
        </h2>
        <p className="text-xl mb-6">
          Kanye West: Redefining Music, One Award at a Time
        </p>
        <p className="mb-8">
          From groundbreaking albums to genre-defying collaborations, Kanye's
          journey through the Grammy Awards reflects his unparalleled impact on
          the music industry.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            className="px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition duration-300"
            onClick={handleExploreAwards}
          >
            Explore Awards
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <img
          src={yeAwardImage}
          alt="Kanye West with Grammy Awards"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="flex justify-between items-center">
            <span className="text-sm">Grammy Awards</span>
            <span className="text-sm">2004 - Present</span>
          </div>
          <div className="w-full bg-gray-700 h-1 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default GrammyAwards;
