import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { albums } from "../../data/albums";
import { getVotePercentage } from "../../utils/voteUtils";
import { ref, onValue, off } from "firebase/database";
import { db } from "../../firebase/firebase";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { GoHomeFill } from "react-icons/go";
import Loader from "../../components/Loading/Loading";

// Register necessary components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Define a set of distinct colors for the donuts
const colors = [
  "#c4771f",
  "#54320b",
  "#ff42d0",
  "#fc8d8d",
  "#d90000",
  "#f5b431",
  "#e0d8c8",
  "#ff9a36",
  "#147502",
  "#FFD700",
  "#20B2AA",
  "#000000",
  "#4682B4",
  "#D2691E",
];

const PollResults = () => {
  const [savedVotes, setSavedVotes] = useState({});
  const [sortOption, setSortOption] = useState("votes");
  const [isLoading, setIsLoading] = useState(true);
  const maxVotesDisplay = 250;
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const votePageButton = () => {
    navigate("/vote");
  };

  useEffect(() => {
    const pollsRef = ref(db, "polls/albums");

    const handleDataChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const counts = albums.reduce((acc, album) => {
          acc[album.title] = data[album.title]?.votes || 0;
          return acc;
        }, {});
        setSavedVotes(counts);
      }
      setIsLoading(false);
    };

    onValue(pollsRef, handleDataChange);

    return () => {
      off(pollsRef, "value", handleDataChange);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const chartData = {
    labels: albums.map((album) => album.title),
    datasets: [
      {
        data: albums.map((album) => savedVotes[album.title] || 0),
        backgroundColor: colors.slice(0, albums.length),
        borderColor: colors.slice(0, albums.length),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} votes (${getVotePercentage(
              value,
              maxVotesDisplay
            )}%)`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const legendData = albums.map((album, index) => ({
    title: album.title,
    color: colors[index % colors.length],
  }));

  const sortedAlbums = () => {
    return [...albums].sort((a, b) => {
      if (sortOption === "votes") {
        return (savedVotes[b.title] || 0) - (savedVotes[a.title] || 0);
      } else if (sortOption === "release") {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      }
      return 0;
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/2">
          <Doughnut data={chartData} options={chartOptions} height={250} />
        </div>
        <div className="w-full lg:w-1/6 flex flex-col justify-between">
          <div className="flex flex-wrap gap-2 mb-4">
            {legendData.map((item) => (
              <div key={item.title} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="ml-2 text-sm">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 ml-4 flex items-center text-sm">
        <label htmlFor="sort" className="text-gray-400 mr-3">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-gray-800 text-gray-200 border border-gray-600 rounded-md px-2 py-1"
        >
          <option value="votes">Votes</option>
          <option value="release">Release Date</option>
        </select>
        <button
          onClick={handleBackToHome}
          className="ml-4 py-2 px-4 rounded-full font-semibold bg-yellow-500 hover:bg-yellow-700 transition duration-300 justify-self-end text-md shadow-md hover:shadow-lg"
        >
          <GoHomeFill />
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {sortedAlbums().map((album) => (
          <div key={album.title} className="mb-2 p-4">
            <div className="flex items-center">
              <img
                src={album.imageUrl}
                alt={album.title}
                className="w-12 h-12 rounded-md mr-2 object-cover"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-medium truncate">{album.title}</h2>
                <p className="text-gray-400 text-sm">{album.year}</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="bg-gray-700 rounded-full h-1 overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${getVotePercentage(
                      savedVotes[album.title] || 0,
                      maxVotesDisplay
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-1 text-gray-300 text-xs">
                <span>{savedVotes[album.title] || 0} votes</span>
                <span>{maxVotesDisplay}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={votePageButton}
          className="mt-4 bg-yellow-500 hover:bg-yellow-400 py-2 px-4 rounded-full text-center text-black font-semibold"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default PollResults;
