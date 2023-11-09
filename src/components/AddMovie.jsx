import React, { useState } from "react";
import './AddMovie.css';

export default function AddMovie() {
  const [movie, setMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: ""
  });
  const [arr, setArr] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({
      ...movie,
      [name]: value
    });
  };

  const handleAddMovie = () => {
    setArr([...arr, movie]);
    // setMovie({
    //   title: "",
    //   openingText: "",
    //   releaseDate: ""
    // });

    // console.log(movie)
    console.log(arr)
  };

  return (
    <section>
      <div className="container">
        <p>Title</p>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleInputChange}
        />
        <p>Opening Text</p>
        <input
         id="opening_text"
          type="text"
          name="openingText"
          value={movie.openingText}
          onChange={handleInputChange}
        />
        <p>Release Date</p>
        <input
          type="text"
          name="releaseDate"
          value={movie.releaseDate}
          onChange={handleInputChange}
        />

        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
    </section>
  );
}
