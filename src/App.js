import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

// async await means async before function and it will wait till ur done or operation

function App() {
  const [movies, setMovies] = useState([]);
  // for data spinner till we didn't get the data  we can use state

  const [isLoading,setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true)
    const response = await fetch(`https://swapi.dev/api/films`);
    const data = await response.json();
    
    // console.log("data",data)
    const transformedMovies = data.results.map((movieData) => {
      
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    // store the results in some state
    setMovies(transformedMovies);
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies .</p>}

        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
