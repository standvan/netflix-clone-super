import React, { useEffect } from "react";
import Movie from "../components/Movie";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const ResultFilter = ({ movieData, totalMovies, setQuery, query, pages }) => {
  const nextPage = () => {
    if (query.pageNumber < pages) {
      setQuery({ ...query, pageNumber: query.pageNumber + 1 });
    }
  };
  const prevPage = () => {
    if (query.pageNumber > 1) {
      setQuery({ ...query, pageNumber: query.pageNumber - 1 });
    }
  };
  return (
    <div className="mx-10 lg:mx-0">
      <h1 className="text-xl font-medium">
        Total <span className="text-subMain">{totalMovies}</span> items Found
      </h1>
      <div className="my-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {movieData.map((movie, index) => (
          <Movie movie={movie} key={index}></Movie>
        ))}
      </div>
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
  );
};

export default ResultFilter;
