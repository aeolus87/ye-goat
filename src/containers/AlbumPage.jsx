import React, { useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavButton from "../components/CircleNav";
import AlbumCard from "../components/AlbumCard";
import Banner from "../components/Banner";
import useScrollHandler from "../components/useScrollHandler";
import { albums } from "../data/albums";

const AlbumPage = React.memo(() => {
  const navigate = useNavigate();
  const { currentAlbum, scrollToAlbum, scrollToDiscography } =
    useScrollHandler(albums);
  const navRef = useRef(null);

  const bannerAnimations = useMemo(
    () => ({
      container: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 },
      },
      content: {
        initial: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.5, duration: 0.6 },
      },
      text: (delay) => ({
        initial: { y: 10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay, duration: 0.6 },
      }),
    }),
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollNavToCurrentAlbum = useCallback(() => {
    if (currentAlbum !== -1 && navRef.current) {
      const navContainer = navRef.current;
      const activeButton = navContainer.children[currentAlbum];
      if (activeButton) {
        const containerWidth = navContainer.offsetWidth;
        const buttonWidth = activeButton.offsetWidth;
        const scrollLeft =
          activeButton.offsetLeft - containerWidth / 2 + buttonWidth / 2;

        navContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [currentAlbum]);

  useEffect(() => {
    scrollNavToCurrentAlbum();
  }, [currentAlbum, scrollNavToCurrentAlbum]);

  const renderAlbum = useCallback(
    (album, index) => (
      <div
        key={album.title}
        className="h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden z-0 md:p-8"
        id={`album-${index}`}
        style={{
          "--album-background": `url(${album.imageUrl})`,
          "--album-color": album.color,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center z-0 filter blur-sm"
          style={{ backgroundImage: "var(--album-background)" }}
        />
        <div
          className="absolute inset-0 opacity-75 z-10"
          style={{ backgroundColor: "var(--album-color)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-75 z-20" />
        <div className="relative z-50 w-full max-w-4xl">
          <AlbumCard album={album} />
        </div>
      </div>
    ),
    []
  );

  const handleBack = useCallback(() => {
    navigate(-1); // Go back to the previous page
  }, [navigate]);

  return (
    <div className="text-white">
      <Banner
        onExplore={scrollToDiscography}
        onBack={handleBack}
        bannerAnimations={bannerAnimations}
      />

      {currentAlbum !== -1 && (
        <div className="fixed w-full md:w-12 left-0 md:left-4 top-0 md:top-1/2 md:-translate-y-1/2 z-50">
          <div
            ref={navRef}
            className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-4 p-4 md:p-0 overflow-x-auto md:overflow-x-visible no-scrollbar"
          >
            {albums.map((album, index) => (
              <NavButton
                key={album.title}
                album={album}
                isActive={index === currentAlbum}
                onClick={() => scrollToAlbum(index)}
              />
            ))}
          </div>
        </div>
      )}

      {albums.map(renderAlbum)}
    </div>
  );
});

export default AlbumPage;
