import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFavoriteMovieAction } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const Movie = ({ movie }) => {
  const likeStyle =
    "flex-btn hover:border-red rounded-md bg-subMain p-2 text-white duration-1000 hover:border hover:bg-transparent";
  const unLikeStyle =
    "flex-btn hover:border-red rounded-md bg-dryGray p-2 text-white duration-1000 hover:border hover:bg-transparent";
  const favoritedStorage =
    JSON.parse(localStorage.getItem("favoritedMovies")) || [];
  const changeStyle = () => {
    if (favoritedStorage.includes(movie._id)) {
      return likeStyle;
    } else {
      return unLikeStyle;
    }
  };
  const dispatch = useDispatch();
  const handleAddMovieFavorite = (id) => {
    if (!id) {
      console.error("ID is invalid:", id);
      return;
    }
    dispatch(addFavoriteMovieAction(id)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
      }
    });
  };
  return (
    <div className="transitions relative h-64 w-full rounded border border-border p-1 hover:scale-95">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.titleImage}
          alt=""
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="absolute bottom-0 left-0 right-0 flex h-16 items-center justify-between bg-black bg-opacity-60 px-4">
        <h1>{movie.name}</h1>
        <div
          className={changeStyle()}
          onClick={() => handleAddMovieFavorite(movie._id)}
        >
          <FaHeart></FaHeart>
        </div>
      </div>
    </div>
  );
};

export default Movie;
