import { ref, runTransaction, get, set } from "firebase/database";
import { db } from "../firebase/firebase";

export const getVotePercentage = (votes, maxVotes) => {
  return Math.min((votes / maxVotes) * 100, 100);
};

export const saveUserVotes = async (userId, votes) => {
  console.log("Attempting to save votes", userId, votes);
  if (!userId) {
    throw new Error("No user ID provided");
  }
  const pollsRef = ref(db, "polls/albums");
  try {
    await runTransaction(pollsRef, (currentData) => {
      if (!currentData) {
        currentData = {};
      }
      Object.entries(votes).forEach(([albumTitle, voteCount]) => {
        if (!currentData[albumTitle]) {
          currentData[albumTitle] = { votes: 0 };
        }
        currentData[albumTitle].votes += voteCount;
      });
      return currentData;
    });
    console.log("Votes saved successfully");
  } catch (error) {
    console.error("Error saving votes", error);
    throw error;
  }
};

export const hasUserVoted = async (userId) => {
  const votedRef = ref(db, `votedUsers/${userId}`);
  const snapshot = await get(votedRef);
  return snapshot.exists();
};

export const markUserAsVoted = async (userId) => {
  const votedRef = ref(db, `votedUsers/${userId}`);
  await set(votedRef, true);
};
