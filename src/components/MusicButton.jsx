import React from "react";
import { FaSpotify, FaApple, FaYoutube } from "react-icons/fa";
import { SiTidal } from "react-icons/si";

const MusicPlatformButtons = ({ album }) => {
  if (!album) {
    console.warn("Album data is missing in MusicPlatformButtons");
    return null; // Or return a placeholder/default view
  }

  return (
    <div className="flex space-x-4 justify-center">
      {/* Spotify Button */}
      {album.spotifyUrl && (
        <a href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full">
            <FaSpotify size={30} />
          </button>
        </a>
      )}

      {/* Apple Music Button */}
      {album.appleMusicUrl && (
        <a href={album.appleMusicUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-gray-800 hover:bg-gray-900 text-white p-4 rounded-full">
            <FaApple size={30} />
          </button>
        </a>
      )}

      {/* YouTube Music Button */}
      {album.youtubeMusicUrl && (
        <a
          href={album.youtubeMusicUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full">
            <FaYoutube size={30} />
          </button>
        </a>
      )}

      {/* Tidal Button */}
      {album.tidalUrl && (
        <a href={album.tidalUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-black hover:bg-gray-900 text-white p-4 rounded-full">
            <SiTidal size={30} />
          </button>
        </a>
      )}
    </div>
  );
};

export default MusicPlatformButtons;
