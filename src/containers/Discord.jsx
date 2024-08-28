import React from "react";
import yedc from "../assets/yedc.png"; // Adjust the path if necessary

const DiscordPage = () => {
  return (
    <div className="relative bg-black py-20 px-4 lg:px-8 min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src={yedc}
          alt="Yandhi Discord"
          className="w-full h-full object-cover"
        />
        {/* Radial gradient fading to black on all sides */}
        <div className="absolute inset-0 bg-gradient-radial from-black/70 via-transparent to-black/70"></div>
        {/* Darken the top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
        {/* Darken the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      </div>
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="max-w-lg lg:max-w-none lg:text-center lg:mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-yellow-400 mt-8">
            Join Our Discord Community
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-yellow-300">
            Connect with fellow fans, get the latest updates, and dive into
            discussions about Kanye West. Be a part of the Yandhi community!
          </p>
          <div className="mt-10">
            <a
              href="https://discord.gg/yandhi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-transparent text-sm lg:text-lg font-medium rounded-full text-black bg-yellow-400 hover:bg-yellow-500 hover:text-white transition ease-in-out duration-200"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordPage;
