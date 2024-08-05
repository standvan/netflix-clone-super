import React from "react";
import { BsCollection } from "react-icons/bs";
import Movie from "./Movie";
import Title from "./Title";
import Empty from "./Empty";
import { useSelector } from "react-redux";

const PopularMovies = ({ movies }) => {
  const movieState = useSelector((state) => state.movie);
  return (
    <div className="container mx-auto my-10 flex flex-col gap-10 px-4 lg:px-0">
      <Title title="Popular Movies" Icon={BsCollection}></Title>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <Movie movie={movie} key={index}></Movie>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
