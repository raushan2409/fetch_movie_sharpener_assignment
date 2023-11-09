import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

// async await means async before function and it will wait till ur done or operation

function App() {
  const [movies, setMovies] = useState([]);
  // for data spinner till we didn't get the data  we can use state

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null); //in case of .then .catch we can directly catch the error so here we use try catch  for handling error. now one problem we can face here is the fetch api doesn't treat error status codes as real error it will not throw an technical error if we get back an error status code ,it would be better if we throw a real error if we get the response for unsuccessfull status code and by default fetch doesn't have axios have by default . so we have to do this manually so in that case we have to do this manually by response.ok field (response is succesful or not ) the response also has a staus field which holds the concrete response status code. u could also manually check that.

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://swapi.dev/api/film/`);
      if (!response.ok) {
        // throw new Error("Something went wrong!"); //u can pass ur error msg
        throw new Error("....Retrying"); //u can pass ur error msg
      }
      // in some case u have to pass response.ok before response.json some api also send the json data if req was not successful other api like this one sents the non json data so we have to write before parse that
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies .</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}

        {!isLoading && error && (
          <button onClick={() => setError(null)}>Cancel Retry</button>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
