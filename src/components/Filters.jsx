import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const Filters = ({ onYearSelect, onGenreSelect }) => {
  const [years, setYears] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const yearsResponse = [...Array(50).keys()].map((i) => 2024 - i);

        const genresResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=67720eb8b5f463e667576832b2659cfc');
        setGenres(genresResponse.data.genres);
        setYears(yearsResponse);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  const toggleYearDropdown = () => {
    setShowYearDropdown((prev) => !prev);
    if (showGenreDropdown) {
      setShowGenreDropdown(false);
    }
  };

  const toggleGenreDropdown = () => {
    setShowGenreDropdown((prev) => !prev);
    if (showYearDropdown) {
      setShowYearDropdown(false);
    }
  };

  return (
    <div className="filters-container">
      <div className="filters-buttons">
        <div className="relative">
          <button onClick={toggleYearDropdown} className="filters-year-button">
            Years
          </button>
          {showYearDropdown && (
            <div className="filters-year-dropdown">
              <ul className="filters-dropdown-list">
                {years.map((year) => (
                  <li
                    key={year}
                    className="filters-dropdown-item"
                    onClick={() => {
                      onYearSelect(year);
                      setShowYearDropdown(false);
                    }}
                  >
                    {year}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={toggleGenreDropdown} className="filters-genre-button">
            Genre
          </button>
          {showGenreDropdown && (
            <div className="filters-genre-dropdown">
              <ul className="filters-dropdown-list">
                {genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="filters-dropdown-item"
                    onClick={() => {
                      onGenreSelect(genre.id);
                      setShowGenreDropdown(false);
                    }}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
