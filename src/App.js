import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    // 2nd arg for extra header , body ,method simple object default is get, fetch returns a promise which is a object sending a http req is asynchronous task it can take a certain time then is for catch response and catch is for catching error(handle any error)
    // we get the response and this response data is actually a object with a bunch of data aboutthe response for ex we can read the header simple use response dot (response.), this api send us data in json format json is simply a data format very popular one to exchanging data and it looks like a js object  and there is certain rule, the adv of json data is that it's  very easy to translate to js object but there is a translation state that we need , response object we get have a built in method which will automatically translate this json response body to a real js obj which we canuse in our code simple use json and the json is also return some promise and there for we will return that promise and use again then block and catch data
    fetch(`https://swapi.dev/api/films`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // for convert every obj in result array into a new object
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
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
