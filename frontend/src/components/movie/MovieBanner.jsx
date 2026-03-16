import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const IMG_URL = "https://image.tmdb.org/t/p/original";

const MovieBanner = ({ movies }) => {

  const navigate = useNavigate();

  if (!movies || movies.length === 0) return null;

  const handleClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <div className="banner-wrapper">

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1.3}
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          pagination={{ clickable: true }}
          navigation={true}
        >

          {movies.slice(0, 8).map((movie) => (

            <SwiperSlide key={movie.id}>

              <div
                className="banner-slide"
                onClick={() => handleClick(movie.id)}
                style={{
                  backgroundImage: `url(${IMG_URL + movie.backdrop_path})`
                }}
              >

                <div className="banner-overlay">

                  <h2 className="movie-title">
                    {movie.title}
                  </h2>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>


      <style>{`

.banner-wrapper{
  width:95%;
  margin:25px auto;
}

/* Banner slide */

.banner-slide{
  height:330px;
  border-radius:12px;
  background-size:cover;
  background-position:center;
  cursor:pointer;
  position:relative;
  overflow:hidden;
}

/* Overlay */

.banner-overlay{
  position:absolute;
  bottom:0;
  width:100%;
  padding:30px;
  background:linear-gradient(
    to top,
    rgba(0,0,0,0.9),
    rgba(0,0,0,0.4),
    transparent
  );
}

/* Movie title */

.movie-title{
  color:white;
  font-size:30px;
  font-weight:700;
}

/* Arrows */

.swiper-button-next,
.swiper-button-prev{
  color:white;
}

/* Dots */

.swiper-pagination-bullet{
  background:white;
  opacity:0.6;
}

.swiper-pagination-bullet-active{
  background:#f84464;
  opacity:1;
}

`}</style>

    </>
  );
};

export default MovieBanner;