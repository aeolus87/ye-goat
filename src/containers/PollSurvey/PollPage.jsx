import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/authContext";
import PollResults from "./PollResults";
import { useNavigate } from "react-router-dom";
import { hasUserVoted } from "../../utils/voteUtils"; // Ensure this function is imported correctly

const PollPage = () => {
  const { currentUser, googleLogin } = useAuth();
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const checkUserVoteStatus = async () => {
    if (currentUser) {
      const voted = await hasUserVoted(currentUser.uid);
      setHasVoted(voted);
    }
  };

  useEffect(() => {
    checkUserVoteStatus();
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleVoteClick = async () => {
    if (!currentUser) {
      try {
        setIsLoggingIn(true);
        await googleLogin();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoggingIn(false);
        checkUserVoteStatus(); // Recheck vote status after login
      } catch (error) {
        setIsLoggingIn(false);
        return;
      }
    }

    if (!currentUser || hasVoted) {
      alert("You have already voted or authentication failed.");
      return;
    }

    navigate("/vote"); // Navigate to the voting page
  };

  

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Poll Results</h1>
        <PollResults />
        <div className="text-center mt-8">
          <button
            onClick={handleVoteClick}
            className="py-2 px-4 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            {isLoggingIn ? "Logging In..." : "Go to Voting Page"}
          </button>
      
        </div>
      </div>
    </div>
  );
};

export default PollPage;
