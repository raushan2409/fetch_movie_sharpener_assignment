import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-8fe4c-default-rtdb.firebaseio.com/movies.json"
      ); //this movies is up to u this basically create a new node in that db basically it's a dynamic rest api and json is firebase specific this json
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      // console.log(data);

      const loadedMovies = [];
      for (const key in data) {
        //key are the id of the movie
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // this will a asynchronous task so we use async we can also use try catch to handle error
  async function addMovieHandler(movie) {
    console.log(movie);
    const response = await fetch(
      "https://react-http-8fe4c-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie), //body want the json data so we use stringify , to convert the js obj to  json we can use utility method called json.stringify
        headers: {
          "Content-Type": "application/json", //technically this header is not require by firebase it would be handle the request even if the header is not set but a lot of rest api require extra header so setting it is a best practice
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const deleteMovieHandler = async (movieId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://react-http-8fe4c-default-rtdb.firebaseio.com/movies/${movieId}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong while deleting the movie!");
      }
      // Update the local state to reflect the deleted movie
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
