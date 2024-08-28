import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { timelineEvents } from "../data/timeline";

const TimelineItem = ({ year, events }) => (
  <div className="flex flex-col items-center lg:mb-8 mb-0 w-80 shrink-0">
    <div className="flex items-center w-full">
      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
      <div className="h-0.5 bg-yellow-500 w-full"></div>
    </div>
    <div className="mt-4 text-center">
      <h4 className="text-2xl font-bold text-yellow-500 mb-2">{year}</h4>
      {events.map((event, index) => (
        <div key={index}>
          <h5 className="text-lg font-semibold text-yellow-300 mb-2">
            {event.date}
          </h5>
          <p className="text-gray-300 mb-4">{event.event}</p>
        </div>
      ))}
    </div>
  </div>
);

const Timeline = ({ onScrollEnd, onResetScroll }) => {
  const timelineRef = useRef(null);
  const lineAnimation = useAnimation();

  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;

    const handleScroll = () => {
      const maxScroll =
        timelineElement.scrollWidth - timelineElement.clientWidth;
      const currentScroll = timelineElement.scrollLeft;
      const percentage = currentScroll / maxScroll;

      lineAnimation.start({ scaleX: percentage, transition: { duration: 0 } });
    };

    timelineElement.addEventListener("scroll", handleScroll);
    return () => {
      timelineElement.removeEventListener("scroll", handleScroll);
    };
  }, [onScrollEnd, onResetScroll, lineAnimation]);

  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-yellow-400 mb-12 text-center">
          Ye Timeline
        </h2>
        <motion.div
          className="h-1 bg-yellow-500 mb-4"
          initial={{ scaleX: 0 }}
          animate={lineAnimation}
          style={{ originX: 0 }}
        />
        <div
          ref={timelineRef}
          className="scrollable overflow-x-auto lg:overflow-x-scroll no-scrollbar lg:scrollbar-default"
        >
          <div className="inline-flex space-x-8 pb-6">
            {timelineEvents.map((item, index) => (
              <TimelineItem key={index} year={item.year} events={item.events} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
