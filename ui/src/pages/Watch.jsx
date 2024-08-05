import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { FaArrowLeft, FaHeart, FaPlay } from "react-icons/fa";
import { IoIosCloudDownload } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../redux/slice/movieSlice";
import { addFavoriteMovieAction } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const userState = useSelector((state) => state.user);
  const favoritedStorage =
    JSON.parse(localStorage.getItem("favoritedMovies")) || [];
  const unLikeStyle =
    "transitions rounded-lg border border-border bg-dryGray p-4 hover:bg-transparent";
  const likeStyle =
    "transitions rounded-lg border border-border bg-white p-4 hover:bg-transparent text-subMain";
  const changeStyle = () => {
    if (favoritedStorage.includes(id)) {
      return likeStyle;
    } else {
      return unLikeStyle;
    }
  };
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();
  const addLikeMovie = () => {
    dispatch(addFavoriteMovieAction(id)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
      }
    });
  };
  useEffect(() => {
    dispatch(getMovieByIdAction(id)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setMovie(result.payload);
      }
    });
  }, [userState.isAddFavoriting]);
  return (
    <Layout>
      <div className="flex-colo container mx-auto my-4 gap-10 bg-dry p-4">
        <div className="flex w-full flex-row justify-between bg-main text-white">
          <Link
            className="flex-rows transitions gap-4 p-4 hover:text-border"
            to={`/movies/${id}`}
          >
            <FaArrowLeft />
            <h1 className="text-xl font-semibold">{movie.name}</h1>
          </Link>
          <div className="flex-rows gap-4">
            <div
              className={changeStyle()}
              onClick={() => addLikeMovie(movie._id)}
            >
              <FaHeart className="h-4 w-4" />
            </div>
            <div className="flex-rows cursor-pointer gap-2 bg-subMain px-6 py-4 hover:opacity-60">
              <IoIosCloudDownload />
              Download
            </div>
          </div>
        </div>
        <div className="h-screen w-full">
          {play ? (
            <video autoPlay controls className="h-full w-full rounded">
              <source src={movie.video} type="video/mp4" />
            </video>
          ) : (
            <div className="relative h-full w-full overflow-hidden rounded">
              <div className="flex-btn absolute bottom-0 left-0 right-0 top-0 cursor-pointer bg-main bg-opacity-60">
                <div
                  className="flex-btn rounded-full bg-white p-6 text-subMain"
                  onClick={() => setPlay(true)}
                >
                  <FaPlay className="text-lg" />
                </div>
              </div>
              <img
                src={movie.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Watch;
