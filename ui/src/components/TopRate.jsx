import React, { useRef, useState } from "react";
import { BsBookmarkStarFill, BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Title from "./Title";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const TopRate = ({ movies }) => {
  const [nextE, setNextE] = useState(null);
  const [prevE, setPrevE] = useState(null);
  const stateMovie = useSelector((state) => state.movie);
  const sliderRef = useRef(null);
  const favoritedMovies =
    JSON.parse(localStorage.getItem("favoritedMovies")) || [];
  const likedStyle =
    "transitions rounded-full bg-subMain p-4 hover:bg-opacity-60";
  const dislikedStyle =
    "transitions rounded-full bg-white bg-opacity-55 p-4 hover:bg-subMain";
  const changeLikeStyle = (id) => {
    if (favoritedMovies.includes(id)) {
      return likedStyle;
    } else {
      return dislikedStyle;
    }
  };
  return (
    <div className="container mx-auto my-10">
      <Title title="Top Rates" Icon={BsBookmarkStarFill}></Title>
      {stateMovie.isRated && <Loading />}
      {movies.length !== 0 && (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={40}
            className="my-10"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay, Navigation]}
            navigation={{ prevEl: prevE, nextEl: nextE }}
            ref={sliderRef}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {movies.slice(0, 8).map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="hovered relative h-rate rounded-lg border border-border bg-dry p-4">
                  <img
                    src={movie.image}
                    alt=""
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <div className="flex-colo hoveres absolute bottom-0 left-0 right-0 top-0 gap-5 bg-black bg-opacity-50">
                    <div className={changeLikeStyle(movie._id)}>
                      <FaHeart></FaHeart>
                    </div>
                    <div className="text-xl font-bold">
                      <Link to={`movies/${movie._id}`}>{movie.name}</Link>
                    </div>
                    <div className="flex gap-2 text-lg text-star">
                      <Rating value={movie.rate}></Rating>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex-btn gap-4">
            <button
              className="flex-btn transitions rounded-lg bg-subMain p-3 hover:bg-dry"
              ref={(node) => setPrevE(node)}
            >
              <BsCaretLeft></BsCaretLeft>
            </button>
            <button
              className="flex-btn transitions rounded-lg bg-subMain p-3 hover:bg-dry"
              ref={(node) => setNextE(node)}
            >
              <BsCaretRight></BsCaretRight>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TopRate;
