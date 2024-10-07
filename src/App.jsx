import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

function App() {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('happy'); // Default search term

  const fetchGifs = async (term) => {
    setLoading(true);
    try {
      const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${term}&limit=10&api_key=${API_KEY}`
      );
      setGifs(response.data.data);
    } catch (err) {
      setError('Error fetching GIFs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifs(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGifs(searchTerm);
  };

  if (loading) return <div className="loading"></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1>GIF Carousel</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for GIFs"
        />
        <button type="submit">Search</button>
      </form>
      <Carousel>
        {gifs.map((gif) => (
          <div key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} className="gif-image" />
            <p className="legend">{gif.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
