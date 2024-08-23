import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Filters from './components/Filters';
import About from './components/About'; 
import axios from 'axios';

import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [mediaType, setMediaType] = useState('movie'); 
  const [searchMode, setSearchMode] = useState(false);

  const fetchMovieDetails = async (id, type) => {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=67720eb8b5f463e667576832b2659cfc`);
    return response.data;
  };

  const fetchMovies = async (type, searchQuery = '', year = null, genreId = null) => {
    try {
      let response;
      let results;

      if (searchQuery) {
        const [movieResponse, tvResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/search/movie?api_key=67720eb8b5f463e667576832b2659cfc&query=${searchQuery}`),
          axios.get(`https://api.themoviedb.org/3/search/tv?api_key=67720eb8b5f463e667576832b2659cfc&query=${searchQuery}`)
        ]);

        const combinedResults = [
          ...movieResponse.data.results.map(item => ({ ...item, media_type: 'movie' })),
          ...tvResponse.data.results.map(item => ({ ...item, media_type: 'tv' }))
        ];

        results = await Promise.all(combinedResults.map(item => fetchMovieDetails(item.id, item.media_type)));
        setMovies(results);
        setSearchMode(true); 
      } else {
        const url = new URL(`https://api.themoviedb.org/3/discover/${type}`);
        url.searchParams.append('api_key', '67720eb8b5f463e667576832b2659cfc');
        if (year) url.searchParams.append('primary_release_year', year);
        if (genreId) url.searchParams.append('with_genres', genreId);

        response = await axios.get(url.toString());
        results = await Promise.all(response.data.results.map(item => fetchMovieDetails(item.id, type)));
        setMovies(results);
        setSearchMode(false); 
      }

      setMediaType(type);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMoviesClick = () => fetchMovies('movie');
  const handleTvShowsClick = () => fetchMovies('tv');

  const handleSearch = (searchQuery) => fetchMovies(mediaType, searchQuery);

  const handleYearSelect = (year) => fetchMovies(mediaType, '', year);
  const handleGenreSelect = (genreId) => fetchMovies(mediaType, '', null, genreId);

  return (
    <Router>
      <Navbar onMoviesClick={handleMoviesClick} onTvShowsClick={handleTvShowsClick} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onSearch={handleSearch} />
              <Filters onYearSelect={handleYearSelect} onGenreSelect={handleGenreSelect} />
              <div className="container mx-auto mt-8">
                {movies.length > 0 ? (
                  <Movies movies={movies} mediaType={mediaType} />
                ) : (
                  <p className="text-center text-lg text-white">No movies or TV shows found.</p>
                )}
              </div>
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
