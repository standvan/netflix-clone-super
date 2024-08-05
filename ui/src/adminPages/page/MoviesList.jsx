import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import TableMo from "../../components/TableMo";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesByQueryAction } from "../../redux/slice/movieSlice";
import toast from "react-hot-toast";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const MoviesList = () => {
  const [movieData, setMovieData] = useState([]);
  const movieState = useSelector((state) => state.movie);
  const [pages, setPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllMoviesByQueryAction({
        category: "",
        pageNumber: pageNumber,
        language: "",
        time: "",
        year: "",
        search: "",
      }),
    ).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setMovieData(result.payload.movies);
        setPages(result.payload.pages);
      }
    });
  }, [pageNumber, movieState.isDeleting]);
  const nextPage = () => {
    if (pageNumber < pages) {
      setPageNumber(pageNumber + 1);
    }
  };
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Movies List</h1>
          <div className="flex-btn transitions cursor-pointer rounded border border-subMain p-3 hover:bg-subMain">
            Delete All
          </div>
        </div>
        <TableMo data={movieData}></TableMo>
        <div className="flex-rows my-4 gap-4">
          <div
            className="flex-btn rounded border-2 border-subMain px-4 py-3 hover:bg-subMain"
            onClick={() => prevPage()}
          >
            <MdOutlineKeyboardDoubleArrowLeft></MdOutlineKeyboardDoubleArrowLeft>
          </div>
          <div
            className="flex-btn rounded border-2 border-subMain px-4 py-3 hover:bg-subMain"
            onClick={() => nextPage()}
          >
            <MdOutlineKeyboardDoubleArrowRight></MdOutlineKeyboardDoubleArrowRight>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default MoviesList;
