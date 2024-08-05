import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Table from "../../components/Table";
// import { movieData } from "../../data/moviesData";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from "../../redux/slice/userSlice";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import Empty from "../../components/Empty";

const FavoritesMovies = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [movieData, setMovieData] = useState({});
  useEffect(() => {
    const infoUser = JSON.parse(localStorage.getItem("infoUser"));
    if (infoUser) {
      dispatch(getFavoriteMoviesAction()).then((result) => {
        if (result.error) {
          toast.error(result.payload.message);
        } else {
          setMovieData(result.payload);
        }
      });
    }
  }, [userState.isDeleting]);
  const deleteAllMoviesHandle = () => {
    let confirm = window.confirm(
      "Are you sure you want to delete all favorite movies ",
    );
    if (confirm) {
      dispatch(deleteAllFavoriteMoviesAction()).then((result) => {
        if (result.error) {
          toast.error(result.payload.message);
        } else {
          toast.success(result.payload.message);
        }
      });
    }
  };
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Favorites Movies</h1>
          <div
            className="flex-btn transitions cursor-pointer rounded border border-subMain p-3 hover:bg-subMain"
            onClick={() => deleteAllMoviesHandle()}
          >
            {userState.isDeleting ? "Loading..." : "Delete All"}
          </div>
        </div>
        {userState.isLoading && (
          <div className="h-header">
            <Loading />
          </div>
        )}
        {!userState.isLoading && movieData.length > 0 && (
          <Table data={movieData}></Table>
        )}
        {userState.isLoading ? (
          ""
        ) : movieData.length > 0 ? (
          ""
        ) : (
          <Empty title="Favorites not yet" />
        )}
        {/* <Table data={movieData}></Table> */}
      </div>
    </SideBar>
  );
};

export default FavoritesMovies;
