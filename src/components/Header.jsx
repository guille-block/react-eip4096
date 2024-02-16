import React from 'react';
import '../header.css'; // Make sure this is the correct path to your CSS file
import dimuto from '../dimuto.png'; // Make sure this is the correct path to your image

function Header() {
  return (
    <header className="header">
      <img src={dimuto} alt="Dimuto Logo" className="header-logo" />
      <h2 className="header-title">Blockchain Certificate Document</h2>
    </header>
  );
}

export default Header;
