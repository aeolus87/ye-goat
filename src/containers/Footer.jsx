// Footer.jsx
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} Aeo the Dev. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
