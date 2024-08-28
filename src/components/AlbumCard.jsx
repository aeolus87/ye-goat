// AlbumCard.js
import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { SiApplemusic, SiYoutubemusic, SiTidal } from "react-icons/si";

const AlbumCard = React.memo(({ album }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 md:p-10 flex flex-col items-center shadow-2xl">
      <div
        className={`mb-8 shadow-2xl rounded-2xl overflow-hidden cursor-pointer transition-transform duration-700 ${
          isFlipped ? "transform rotate-y-180" : ""
        }`}
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <img
            src={album.imageUrl}
            alt={`${album.title} cover`}
            className={`w-full h-full object-cover absolute transition-opacity duration-700 ${
              isFlipped ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`w-full h-full absolute ${
              album.color
            } p-4 overflow-y-auto transform rotate-y-180 transition-opacity duration-700 ${
              isFlipped ? "opacity-100" : "opacity-0"
            }`}
          >
            <h3 className="text-xl font-bold mb-2 text-white">Tracks:</h3>
            <ol className="list-decimal list-inside text-gray-200">
              {album.tracks &&
                album.tracks.map((track, index) => (
                  <li key={index} className="mb-1">
                    {track}
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
      <h2 className="text-3xl md:text-5xl lg:font-semibold  mb-4 text-center tracking-tight text-white">
        {album.title}
      </h2>
      <p className="text-xl md:text-2xl mb-4 text-gray-200 font-md">
        {album.year}
      </p>
      <p className="text-base md:text-lg text-center mb-8 text-gray-100 leading-relaxed">
        {album.description}
      </p>
      <div className="flex space-x-4 md:space-x-8">
        <a
          href={album.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-3 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <FaSpotify className="w-6 h-6" />
        </a>

        <a
          href={album.appleMusicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#ff0066] hover:bg-[#ff0099] text-white font-bold py-3 px-3 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <SiApplemusic className="w-6 h-6" />
        </a>

        <a
          href={album.youtubeMusicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-3 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <SiYoutubemusic className="w-6 h-6" />
        </a>

        <a
          href={album.tidalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-3 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <SiTidal className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
});

export default AlbumCard;
