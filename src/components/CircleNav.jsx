// NavButton.js
import React from 'react';

const NavButton = React.memo(({ album, isActive, onClick }) => (
  <button
    className={`group relative flex-shrink-0 size-6 lg:size-8 rounded-full transition-all duration-300 overflow-hidden ${
      isActive ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
    }`}
    onClick={onClick}
  >
    <img 
      src={album.imageUrl} 
      alt={`${album.title} cover`}
      className="w-full h-full object-cover"
    />
    <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden md:block">
      {album.title}
    </span>
  </button>
));

export default NavButton;