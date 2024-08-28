// src/components/Homepage/HomePage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Homepage/Background";
import HeroSection from "../components/Homepage/HeroSection";
import GrammyAwards from "./GrammyAwards";
import KanyeNewsPage from "./yeNews";
import QuotesPage from "./QoutesPage";
import Timeline from "./Timeline";
import DiscordPage from "./Discord";
import PollIntroPage from "./IntroPoll";
import KofiPage from "./Kofi";
import Footer from "./Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const timelineRef = React.useRef(null);

  const handleDiscographyClick = () => {
    navigate("/discography");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative h-screen overflow-hidden">
        <Background />
        <HeroSection onDiscographyClick={handleDiscographyClick} />
      </div>
      <div className="bg-black">
        <KanyeNewsPage />
      </div>
      <div className="bg-black" ref={timelineRef}>
        <Timeline />
      </div>
      <div className="bg-black">
        <GrammyAwards />
      </div>
      <div className="bg-black">
        <QuotesPage />
      </div>
      <div className="bg-black">
        <PollIntroPage />
      </div>
      <div className="bg-black">
        <DiscordPage />
      </div>
      <div className="bg-black">
        <KofiPage />
      </div>
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default React.memo(HomePage);
