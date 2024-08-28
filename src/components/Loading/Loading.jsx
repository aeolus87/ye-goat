import React from "react";
import "./Loading.css"; // Make sure to create this CSS file with the styles above

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <span>Y</span>
        <span>E</span>
      </div>
    </div>
  );
};

export default Loader;
