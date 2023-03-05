import axios from "../utils/axios";
import { useEffect, useState } from "react";
import "./Row.css";

export const Row = (props) => {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  // Asynchronously fetch the movies
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(props.fetchUrl);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [props.fetchUrl]);

  return (
    <div className="row">
      <h2>{props.title}</h2>

      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((props.isLargeRow && movie.poster_path) ||
              (!props.isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${
                  props.isLargeRow && "row__posterLarge"
                }`}
                key={movie.id}
                src={`${base_url}${
                  props.isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
};
