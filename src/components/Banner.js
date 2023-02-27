import { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../utils/axios";
import requests from "../functions/Requests";

export const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      // Randomly select a Netflix original
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }

    fetchData();
  }, []);

  console.log(movie);

  // ellipses function, truncate movie description
  const truncateDescription = (string, end) => {
    return string?.length > end ? string.substring(0, end - 1) + "..." : string;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__playbutton">&#9654; Play</button>
          <button className="banner__infobutton">&#x1F6C8; More Info</button>
        </div>
        <h1 className="banner__description">
          {truncateDescription(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
};
