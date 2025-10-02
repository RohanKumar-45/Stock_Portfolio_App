import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <h1>Stock Portfolio Manager</h1>
        <nav>
          <Link to="/">Portfolio</Link>
          <Link to="/add">Add Stock</Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;