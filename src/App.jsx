import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebPassword from "./containers/WebPassword";
import HomePage from "./containers/HomePage";
import AlbumPage from "./containers/AlbumPage";
import Awards from "./components/Awards";
import PollPage from "./containers/PollSurvey/PollResult";
import VotePage from "./containers/PollSurvey/VotePage";
import Thankyou from "./containers/PollSurvey/thanks";
import useGoogleAnalytics from "./useGoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "./auth/authContext"; // Ensure this is the correct path

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);

  useGoogleAnalytics("G-MEZJL7REQD");

  const handleAuthentication = () => {
    setAuthenticated(true);
  };

  if (!authenticated) {
    return <WebPassword onAuthenticate={handleAuthentication} />;
  }

  return (
    <>
      <SpeedInsights />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discography" element={<AlbumPage />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/poll-survey" element={<PollPage />} />
            <Route path="/vote" element={<VotePage />} />
            <Route path="/thanks" element={<Thankyou />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
