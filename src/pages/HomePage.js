import { Banner } from "../components/Banner";
import { NavBar } from "../components/NavBar";
import { Row } from "../components/Row";
import requests from "../functions/Requests";

/*
The Netflix homepage will consist of the navigation bar at the top, a scrolling banner, and multiple rows of movies.
*/

export const HomePage = () => {
  return (
    <div className="homePage">
      <NavBar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};
