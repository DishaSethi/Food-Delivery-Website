import React from 'react';
import './Header.css';
const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
            Choose from a diverse menu featuring a variety of cuisines. Crafted with love and care by our chefs.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
