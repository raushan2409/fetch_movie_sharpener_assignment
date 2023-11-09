import React, { useEffect, useState,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";


function App() {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  // this will also run
  // useEffect(()=>{
  //   fetchMoviesHandler();
  // },[])
  
  

  const fetchMoviesHandler = useCallback(async function() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://swapi.dev/api/films/`);
      if (!response.ok) {
        throw new Error("....Retrying"); //u can pass ur error msg
      }
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

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    // console.log(isLoading);
  },[])
  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler])


  return (
    <React.Fragment>
<AddMovie/>
     
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies .</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}

        {/* {!isLoading && error && (
          <button onClick={() => setError(null)}>Cancel Retry</button>
        )} */}
      </section>
    </React.Fragment>
  );
}

export default App;
