import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/common/Navbar";
import MovieCard from "../components/movie/MovieCard";
import MovieBanner from "../components/movie/MovieBanner";

const API_KEY = "418fa86a2c7f58ec4d60820d43d41ec5";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const Home = () => {

  const [movies, setMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=IN&page=${page}`
      );

      setMovies(res.data.results);

      if (res.data.results.length > 0) {
        setBannerMovie(res.data.results[0]);
      }

    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  return (
    <>
      <Navbar />

      {movies.length > 0 && <MovieBanner movies={movies} />}

      <div className="container">

        <h2 className="title">Streaming Now</h2>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              img={IMG_URL + movie.poster_path}
            />
          ))}
        </div>

        <div className="pagination">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>

      {/* CSS INSIDE SAME FILE */}

      <style>{`

      .container{
        padding:40px 60px;
        background:#f5f5f5;
        min-height:100vh;
      }

      .title{
        font-size:28px;
        font-weight:700;
        margin-bottom:25px;
      }

      .movie-grid{
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
        gap:25px;
      }

      .pagination{
        margin-top:40px;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:20px;
      }

      .pagination button{
        padding:10px 18px;
        border:none;
        background:#f84464;
        color:white;
        border-radius:6px;
        cursor:pointer;
        font-weight:600;
      }

      .pagination button:disabled{
        background:#ccc;
        cursor:not-allowed;
      }

      .pagination span{
        font-weight:600;
      }

      `}</style>

    </>
  );
};

export default Home;