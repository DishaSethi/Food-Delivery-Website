import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { ThemeContext } from '../../Context/ThemeContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className={`navbar ${theme}`}>
      <Link to='/' onClick={() => setMenuOpen(false)}>
        {/* <img src={assets.logo} alt="Logo" className="logo" /> */}
      </Link>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Menu */}
      <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link to='/' onClick={() => { setMenu("home"); setMenuOpen(false); }} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu"); setMenuOpen(false); }} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => { setMenu("mobile-app"); setMenuOpen(false); }} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => { setMenu("contact-us"); setMenuOpen(false); }} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>

      {/* Navbar Right Section */}
      <div className="navbar-right">
        {/* Search Bar */}
        {/* <input type="text" placeholder='Search food..' className='navbar-search-input' onChange={(e)=>setSearchTerm(e.target.value)} /> */}

        <Link to="/search">
          <img src={assets.search_icon} alt="" />
      </Link>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => { setShowLogin(true); setMenuOpen(false); }}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => { navigate('/myorders'); setMenuOpen(false); }}>
                <img src={assets.bag_icon} alt="" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
