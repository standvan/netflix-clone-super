import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaCalendarAlt, FaClock, FaHeart } from "react-icons/fa";
import Empty from "../components/Empty";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Banner = ({ movies }) => {
  const movieState = useSelector((state) => state.movie);
  const favoritedStorage =
    JSON.parse(localStorage.getItem("favoritedMovies")) || [];
  const disLikeStyle =
    "flex-btn rounded bg-white bg-opacity-15 px-6 py-2.5 text-white duration-700 hover:text-subMain";
  const likeStyle =
    "flex-btn rounded bg-subMain  px-6 py-2.5 text-white duration-700 hover:text-subMain";
  const changeStyle = (id) => {
    if (favoritedStorage.includes(id)) {
      return likeStyle;
    } else {
      return disLikeStyle;
    }
  };
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 lg:px-0">
      {movieState.isRandom && (
        <div className="flex-colo h-header">
          <Loading />
        </div>
      )}
      <Swiper
        direction="vertical"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={1}
        modules={[Autoplay]}
        loop={true}
        className="h-48 w-full bg-dry lg:h-96"
      >
        {movies.length > 0 ? (
          movies.slice(0, 3).map((movie, index) => (
            <SwiperSlide key={index}>
              <img
                src={movie.titleImage}
                alt=""
                className="relative h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col gap-4 bg-black/60 pl-10 pt-10 lg:gap-8 lg:pl-52 lg:pt-24">
                <h1 className="truncate text-xl font-bold capitalize lg:text-4xl">
                  {movie.name}
                </h1>
                <div className="flex justify-start gap-10 font-medium text-dryGray">
                  <p>{movie.category}</p>
                  <p className="flex-btn gap-2">
                    <FaCalendarAlt className="text-xs text-subMain"></FaCalendarAlt>
                    {movie.year}
                  </p>
                  <p className="flex-btn gap-2">
                    <FaClock className="text-subMain"></FaClock>
                    {movie.time}
                  </p>
                </div>
                <div className="flex gap-6">
                  <button
                    className="flex-btn rounded bg-subMain px-6 py-2.5 font-medium duration-700 hover:text-black"
                    onClick={() => navigate(`/watch/${movie._id}`)}
                  >
                    Watch
                  </button>
                  <button className={changeStyle(movie._id)}>
                    <FaHeart></FaHeart>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <Empty />
        )}
      </Swiper>
    </div>
  );
};

export default Banner;
