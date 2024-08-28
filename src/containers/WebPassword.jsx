import React, { useState, useRef } from "react";
import exduhyeVideo from "../assets/exduhye.mp4";
import { FaVolumeMute, FaVolumeUp, FaQuestionCircle } from "react-icons/fa";
import Loader from "../components/Loading/Loading";

function WebPassword({ onAuthenticate }) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const videoRef = useRef(null);

  const validPasswords = [
    "thecollegedropout",
    "lateregistration",
    "graduation",
    "808sandheartbreak",
    "mybeautifuldarktwistedfantasy",
    "mbdtf",
    "yeezus",
    "watchthethrone",
    "kidsseeghosts",
    "lateorchestration",
    "thelifeofpablo",
    "ye",
    "jesusisking",
    "donda",
    "donda2",
    "vultures1",
    "vultures2",
  ];

  const normalizeInput = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedInput = normalizeInput(input);
    if (validPasswords.includes(normalizedInput)) {
      onAuthenticate();
    } else {
      setMessage(
        "Incorrect. You don't really love Ye if you don't know at least one of his albums."
      );
    }
    setInput("");
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleLoadedData = () => {
    setLoading(false);
  };

  const toggleHintMessage = () => {
    if (showHint) {
      setMessage("");
    } else {
      setMessage("Any Ye Album");
    }
    setShowHint(!showHint);
  };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center p-4 overflow-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
            >
              {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>
          </div>

          <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4 text-white">
              Enter Password
            </h1>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="password"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter password"
                  className="flex-1 px-4 py-2 rounded border border-gray-300 bg-white bg-opacity-90"
                  autoComplete="off"
                  autoCapitalize="none"
                />

                <button
                  type="button"
                  onClick={toggleHintMessage}
                  className="bg-white text-black p-2 rounded hover:bg-gray-200 transition duration-300"
                  title={showHint ? "Hide Hint" : "Show Hint"}
                >
                  <FaQuestionCircle size={20} />
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition duration-300 font-bold"
              >
                Submit
              </button>
              {message && (
                <p className="mt-4 text-lg font-semibold text-white">
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Credits */}
          <div className="absolute bottom-4 right-4 z-20">
            <a
              href="https://www.youtube.com/channel/UC7JPj8YkDcQEH7pJWDprJLA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-semibold bg-black bg-opacity-50 px-2 py-1 rounded cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              Video by ExDuh
            </a>
          </div>
        </>
      )}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={handleLoadedData}
        className={`absolute top-1/2 left-1/2 min-w-[calc(100%+10px)] min-h-[calc(100%+10px)] w-auto h-auto max-w-none object-cover z-0 transform -translate-x-1/2 -translate-y-1/2 scale-[1.01] ${
          loading ? "hidden" : ""
        }`}
      >
        <source src={exduhyeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default WebPassword;
