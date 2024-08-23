import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = ({ onMoviesClick, onTvShowsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('home');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === 'movies') {
      onMoviesClick();
    } else if (buttonName === 'tvShows') {
      onTvShowsClick();
    }
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-600 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1.5">
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={Logo}
            className="h-12 sm:h-20" // Smaller height for mobile, default for larger screens
            alt="Flowbite Logo"
          />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="hidden md:block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 me-2 mb-2"
            onClick={() => window.open('https://github.com/asjad491/Movies-search-application', '_blank')}
          >
            Get Code!
          </button>

          <button
            onClick={handleMenuToggle}
            type="button"
            className="inline-flex bg-transparentitems-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 dark:text-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-600 rounded-lg bg-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 text-lg rounded ${activeButton === 'home' ? 'text-blue-700' : 'text-white'}`}
                onClick={() => handleButtonClick('home')}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 text-lg rounded ${activeButton === 'about' ? 'text-blue-700' : 'text-white'}`}
                onClick={() => handleButtonClick('about')}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/?mediaType=movie"
                className={`block py-2 px-3 text-lg rounded ${activeButton === 'movies' ? 'text-blue-700' : 'text-white'}`}
                onClick={() => handleButtonClick('movies')}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/?mediaType=tv"
                className={`block py-2 px-3 text-lg rounded ${activeButton === 'tvShows' ? 'text-blue-700' : 'text-white'}`}
                onClick={() => handleButtonClick('tvShows')}
              >
                TV Shows
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
