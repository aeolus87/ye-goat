import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext"; // Adjust the import path as needed

function Thankyou() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use the auth context to get the logout function

  const handleLogout = async () => {
    try {
      await logout(); // Ensure you have a logout function in your auth context
      navigate("/poll-survey"); // Redirect to poll or any other page
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6 flex flex-col items-center justify-center lg:px-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        <h1 className="text-3xl font-semibold mb-4">Thank You!</h1>
        <p className="text-green-400 text-lg mb-6">
          You've already cast your votes. We appreciate your participation!
        </p>
        <button
          onClick={handleLogout}
          className="py-2 px-6 rounded-full bg-red-600 hover:bg-red-700 transition duration-300 font-semibold text-md shadow-md hover:shadow-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Thankyou;
