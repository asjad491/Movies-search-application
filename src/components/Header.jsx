import React, { useState } from 'react';
import Logoandname from '../assets/Logoandname.png';
import { IoIosSearch } from "react-icons/io";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue) {
      setLoading(true);
      try {
        await onSearch(searchValue); // Call the search handler passed as prop
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      onSearch(''); // Clear search if input is empty
    }
  };

  return (
    <header className="flex flex-col m-3 items-center py-28 pt-8rem pb-2 bg-transparent">
      <img
        src={Logoandname}
        alt="Header Image"
        className="w-80 h-48 rounded-full"
      />
      <h1 className="mt-4 text-3xl text-white font-bold">Watch Online!</h1>
      <p className="mt-2 text-lg text-center   text-blue-600">From Classics to New Releases - Find It All Here!</p>
      <div className="w-full max-w-md mx-auto mt-5 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a movie or TV show..."
          className="p-2 pl-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IoIosSearch
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg"
        />
        {loading && <div className="mt-2 text-center">Loading...</div>}
      </div>
    </header>
  );
};

export default Header;
