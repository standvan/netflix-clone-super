import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaPlay, FaShareAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Movie from "../components/Movie";
import {
  BsBookmarkStarFill,
  BsCollection,
  BsFillPeopleFill,
} from "react-icons/bs";
import Title from "../components/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Rating from "../components/Rating";
import ShareMovieModal from "../components/modal/ShareMovieModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createMovieReviewAction,
  getAllMoviesByQueryAction,
  getMovieByIdAction,
} from "../redux/slice/movieSlice";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import Empty from "../components/Empty";

const comment = [
  {
    fullname: "Tom Cruise",
    image: "https://netflixo.vercel.app/images/c1.png",
    rating: 2,
    content:
      "Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.",
  },
  {
    fullname: "Emily Blunt",
    image: "https://netflixo.vercel.app/images/c2.png",
    rating: 4.5,
    content: "The majority have suffered alteration.",
  },
  {
    fullname: "John Snow",
    image: "https://netflixo.vercel.app/images/c2.png",
    rating: 4.5,
    content: "The majority have suffered alteration.",
  },
  {
    fullname: "John Snow 2",
    image: "https://netflixo.vercel.app/images/c2.png",
    rating: 4.5,
    content: "The majority have suffered alteration.",
  },
  {
    fullname: "John Snow 3",
    image: "https://netflixo.vercel.app/images/c2.png",
    rating: 4.5,
    content: "The majority have suffered alteration.",
  },
  {
    fullname: "John Snow 5",
    image: "https://netflixo.vercel.app/images/c2.png",
    rating: 4.5,
    content: "The majority have suffered alteration.",
  },
];
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const movieState = useSelector((state) => state.movie);
  const [movieRelate, setMovieRelate] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviewFormData, setReviewFormData] = useState({
    rating: "",
    comment: "",
  });
  useEffect(() => {
    setReviewFormData({ ...reviewFormData, rating: rating, comment: comment });
  }, [rating, comment]);
  useEffect(() => {
    dispatch(getMovieByIdAction(id)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setMovie(result.payload);
      }
    });
  }, []);
  useEffect(() => {
    dispatch(
      getAllMoviesByQueryAction({
        category: movie.category,
        pageNumber: 1,
        language: "",
        time: "",
        year: "",
        search: "",
      }),
    ).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setMovieRelate(result.payload.movies);
      }
    });
  }, [movie]);
  const createReviewHandle = (e) => {
    e.preventDefault();
    const trimed = {
      rating: reviewFormData.rating,
      comment: reviewFormData.comment.trim(),
      id: id,
    };
    dispatch(createMovieReviewAction(trimed)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
        setRating(0);
        setComment("");
      }
    });
  };
  return (
    <Layout>
      {movieState.isLoading && (
        <div className="h-header">
          <Loading />
        </div>
      )}
      {Object.keys(movie).length > 0 && (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          ></ShareMovieModal>
          <div className="relative w-full lg:h-screen">
            <img
              src={movie.titleImage}
              alt=""
              className="hidden h-full w-full object-cover lg:block"
            />
            <div className="bottom-0 left-0 right-0 top-0 bg-main bg-opacity-90 lg:absolute">
              <div className="container mx-auto grid h-full grid-cols-1 gap-8 py-8 lg:grid-cols-3">
                <div className="col-span-1 p-0 lg:px-4">
                  <img
                    src={movie.image}
                    alt=""
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
                <div className="m-4 grid grid-cols-1 lg:col-span-2 lg:m-0 lg:grid-cols-5">
                  <div className="flex flex-col gap-8 pt-8 lg:col-span-3">
                    <h1 className="text-4xl font-bold">{movie.name}</h1>
                    <div className="flex gap-4">
                      <button className="bg-subMain px-2 py-1 text-xs">
                        HD 4k
                      </button>
                      <p>{movie.category}</p>
                      <p className="flex-rows gap-2">
                        <FaCalendarAlt className="text-xs text-subMain"></FaCalendarAlt>
                        {movie.year}
                      </p>
                      <p className="flex-rows gap-2">
                        <FaClock className="text-xs text-subMain"></FaClock>
                        {movie.time} hr
                      </p>
                    </div>
                    <div className="text-sm leading-8 text-text">
                      {movie.desc}
                    </div>
                    <div
                      className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-main p-4 sm:grid-cols-5
                "
                    >
                      <div className="flex-btn col-span-1 sm:col-span-1">
                        <button
                          className="flex-btn rounded-lg bg-white bg-opacity-60 p-3"
                          onClick={() => setModalOpen(true)}
                        >
                          <FaShareAlt></FaShareAlt>
                        </button>
                      </div>
                      <div className="flex-rows col-span-2 border-l border-border pl-4 sm:col-span-2">
                        <p>Language : &nbsp; {movie.language}</p>
                      </div>
                      <div className="col-span-3 mt-4 sm:col-span-2 sm:mt-0">
                        <button
                          className="transitions h-14 w-full rounded-full border-2 border-subMain bg-dry hover:bg-subMain sm:h-full"
                          onClick={() => navigate(`/watch/${movie._id}`)}
                        >
                          Watch
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 text-lg text-star">
                      <Rating value={movie.rate} />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end lg:col-span-2 lg:mt-0">
                    <button className="transitions flex-colo relative h-20 w-full rounded-lg border-2 border-subMain bg-subMain hover:bg-transparent lg:h-64 lg:w-1/4">
                      <div className="text-md flex-rows absolute gap-6 uppercase tracking-widest lg:rotate-90">
                        Download
                        <FiDownload className="text-xl"></FiDownload>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-4 p-4 lg:p-0">
            <Title title="Casts" Icon={BsFillPeopleFill}></Title>
            <Swiper
              slidesPerView={1}
              spaceBetween={40}
              className="my-10"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              modules={[Autoplay]}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                // when window width is >= 1024px
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 35,
                },
              }}
            >
              {movie.casts.map((cas, index) => (
                <SwiperSlide key={index}>
                  <div className="flex-colo gap-3 rounded-lg border border-border bg-dry p-4">
                    <img
                      src={cas.image}
                      alt=""
                      className="h-64 w-full rounded object-cover"
                    />
                    <p className="text-sm text-text">{cas.name}</p>
                  </div>
                </SwiperSlide>
              ))}
              {/* <SwiperSlide>
                <div className="flex-colo gap-3 rounded-lg border border-border bg-dry p-4">
                  <img
                    src="https://netflixo.vercel.app/images/c5.png"
                    alt=""
                    className="h-64 w-full rounded object-cover"
                  />
                  <p className="text-sm text-text">Tom Cruise</p>
                </div>
              </SwiperSlide> */}
            </Swiper>
          </div>
          <div className="container mx-auto">
            <Title title="Review" Icon={BsBookmarkStarFill}></Title>
            <div className="my-10 grid grid-cols-1 gap-10 rounded bg-dry px-10 py-10 lg:grid-cols-2">
              <form
                className="flex flex-col gap-8"
                onSubmit={createReviewHandle}
                method="post"
              >
                <h1 className="text-xl font-semibold text-text">
                  Review "{movie.name}"
                </h1>
                <p className="text-sm font-semibold leading-7 text-border">
                  Write a review for this movie. It will be posted on this page.
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                </p>
                <label htmlFor="" className="font-semibold text-text">
                  Select Rating
                </label>
                <select
                  name="rating"
                  id=""
                  className="rounded border border-border bg-main p-4 text-sm text-text"
                  value={reviewFormData.rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="0">Poor</option>
                  <option value="1">Fair</option>
                  <option value="2">Good</option>
                  <option value="3">Very Good</option>
                  <option value="4">Excellent</option>
                  <option value="5">MasterPiece</option>
                </select>
                <div className="flex flex-row gap-3 text-xl text-star">
                  <Rating value={rating}></Rating>
                </div>
                <label htmlFor="" className="font-semibold text-text">
                  Message
                </label>
                <textarea
                  name="comment"
                  id=""
                  className="h-44 w-full rounded border border-border bg-main p-4 text-sm"
                  value={reviewFormData.comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Make it short and sweet"
                ></textarea>
                <button
                  className="flex-btn w-full rounded bg-subMain p-4"
                  type="submit"
                >
                  Submit
                </button>
              </form>
              <div className="flex flex-col gap-8">
                <h1 className="text-xl font-semibold text-text">
                  Reviews ({movie.reviews.length})
                </h1>
                <div className="flex h-header w-full flex-col gap-4 overflow-y-scroll rounded bg-main p-4">
                  {movie.reviews.length > 0 ? (
                    movie.reviews.map((item, index) => (
                      <div
                        className="grid w-full grid-cols-1 rounded-lg bg-dry sm:grid-cols-5"
                        key={index}
                      >
                        <div className="grid sm:col-span-4 sm:grid-cols-4">
                          <div className="hidden p-3 sm:col-span-1 sm:block">
                            <img
                              src={item.userImage}
                              alt=""
                              className="w-full rounded"
                            />
                          </div>
                          <div className="flex flex-col gap-4 py-3 sm:col-span-3">
                            <h1 className="font-semibold">{item.username}</h1>
                            <p className="text-xs text-text">{item.comment}</p>
                          </div>
                        </div>
                        <div className="flex-rows border-l border-border text-star sm:col-span-1">
                          <Rating value={item.rating}></Rating>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty title="No comments yet" />
                  )}
                  {movieState.isReviewing ? <Loading /> : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto mb-10 flex flex-col gap-4">
            <Title title="Related Movies" Icon={BsCollection}></Title>
            {movieRelate.length === 0 && <Empty title="Not movies related" />}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {movieRelate.length > 0 &&
                movieRelate.map((movie, index) => (
                  <Movie movie={movie} key={index}></Movie>
                ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default MovieDetails;
