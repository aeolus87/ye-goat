import React, { useState, useEffect, useCallback } from "react";
import { albums } from "../../data/albums";
import {
  saveUserVotes,
  hasUserVoted,
  markUserAsVoted,
} from "../../utils/voteUtils";
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import Thankyou from "./thanks";
import Loader from "../../components/Loading/Loading";
const VotePage = () => {
  const { currentUser, googleLogin, logout } = useAuth();
  const [sessionVotes, setSessionVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const maxVotesPerUser = 3;
  const navigate = useNavigate();

  const checkUserVoteStatus = useCallback(async () => {
    if (currentUser) {
      const voted = await hasUserVoted(currentUser.uid);
      setHasVoted(voted);
      if (voted) {
        setSessionVotes({});
      }
    } else {
      setIsLoggingIn(true);
    }
    setIsLoading(false);
  }, [currentUser]);

  useEffect(() => {
    checkUserVoteStatus();

    return () => {
      if (currentUser) {
        sessionStorage.removeItem("sessionVotes");
      }
    };
  }, [checkUserVoteStatus, currentUser]);

  const handleLogin = async () => {
    try {
      await googleLogin();
      await checkUserVoteStatus();
      setIsLoggingIn(false);
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Failed to authenticate. Please try again.");
      setIsLoggingIn(false);
    }
  };

  const handleVoteClick = (albumTitle) => {
    if (hasVoted) {
      alert("You have already voted.");
      return;
    }

    setSessionVotes((prev) => {
      const currentVotes = prev[albumTitle] || 0;
      const totalSessionVotes = Object.values(prev).reduce((a, b) => a + b, 0);

      if (currentVotes > 0) {
        return { ...prev, [albumTitle]: currentVotes - 1 };
      } else if (totalSessionVotes < maxVotesPerUser) {
        return { ...prev, [albumTitle]: currentVotes + 1 };
      }
      return prev;
    });
  };

  const handleConfirmClick = async () => {
    if (!currentUser) {
      await handleLogin();
      return;
    }

    const userId = currentUser.uid;
    if (await hasUserVoted(userId)) {
      alert("You have already voted.");
      setHasVoted(true);
      return;
    }

    try {
      await saveUserVotes(userId, sessionVotes);
      await markUserAsVoted(userId);
      setHasVoted(true);
      navigate("/thanks");
    } catch (error) {
      console.error("Error saving votes: ", error);
      alert("Failed to save votes. Please try again.");
    }
  };

  const handleCancel = async () => {
    try {
      await logout();
      navigate("/poll-survey");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const totalSessionVotes = Object.values(sessionVotes).reduce(
    (a, b) => a + b,
    0
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isLoggingIn) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
          <h4 className="text-lg text-gray-400 mb-6">
            You need to be logged in to cast your votes. Please log in with
            Google to continue.
          </h4>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogin}
              className="py-2 px-6 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold text-md shadow-md hover:shadow-lg"
            >
              Log In with Google
            </button>
            <button
              onClick={handleCancel}
              className="py-2 px-6 rounded-full bg-gray-600 hover:bg-yellow-600 transition duration-300 font-semibold text-md shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (hasVoted) {
    return <Thankyou />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6 flex flex-col items-center justify-center lg:px-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Vote for your favorite album
      </h1>
      <p className="text-center mb-8 text-gray-400">
        You can vote for up to {maxVotesPerUser} albums.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {albums.map((album) => (
          <div
            key={album.title}
            className={`bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer ${
              sessionVotes[album.title] ? "border-2 border-yellow-500" : ""
            }`}
            onClick={() => handleVoteClick(album.title)}
          >
            <div className="flex items-center mb-4">
              <img
                src={album.imageUrl}
                alt={album.title}
                className="w-24 h-24 rounded-md mr-6 object-cover shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold">{album.title}</h2>
                <p className="text-gray-400">{album.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-8 w-full max-w-md justify-center">
        {!hasVoted && totalSessionVotes === maxVotesPerUser && (
          <button
            onClick={handleConfirmClick}
            className="py-3 px-6 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg w-full lg:w-auto"
            aria-label="Confirm votes"
          >
            Confirm Votes
          </button>
        )}
        <button
          onClick={handleCancel}
          className="py-3 px-6 rounded-full font-semibold bg-red-600 hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg w-full lg:w-auto"
          aria-label="Cancel voting"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VotePage;
