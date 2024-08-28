import React from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/yevid.mp4"; // Adjust the path as needed

const PollIntroPage = () => {
  const navigate = useNavigate();

  const handleStartVoting = () => {
    navigate("/poll-survey");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      {/* Blurred and Darkened Video Background */}
      <video
        src={bgVideo}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-100"
      />

      {/* Main Video Background */}
      <video
        src={bgVideo}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-none brightness-100"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Top Gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent"></div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between text-center px-4 w-full max-w-3xl mx-auto h-full py-16">
        <h1 className="text-3xl lg:text-4xl font-bold text-yellow-400 mt-16">
          What's Your Favorite Ye Album?
        </h1>

        <div className="mt-72">
          <p className="text-xl lg:text-2xl text-white mb-12 max-w-xl mx-auto">
            Share your love for Ye! Vote now and help choose the greatest album.
          </p>
          <button
            onClick={handleStartVoting}
            className="px-8 py-4 bg-yellow-400 text-black text-lg rounded-full shadow-lg hover:bg-yellow-300 transition duration-300"
          >
            Vote Now
          </button>
        </div>
      </div>

      <p className="relative z-20 text-sm text-white mb-20">
        Credits: @bypatrikas from Instagram
      </p>
    </div>
  );
};

export default PollIntroPage;
