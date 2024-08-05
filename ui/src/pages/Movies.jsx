import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import Layout from "../layout/Layout";
import ResultFilter from "../components/ResultFilter";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesByQueryAction } from "../redux/slice/movieSlice";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import { getAllCategoryAction } from "../redux/slice/categorySlice";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const Movies = () => {
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState([]);
  const [totalMovies, setTotalMovies] = useState(1);
  const [pages, setPages] = useState(1);
  const movieState = useSelector((state) => state.movie);
  const userState = useSelector((state) => state.user);
  const [query, setQuery] = useState({
    category: "",
    pageNumber: 1,
    language: "",
    time: "",
    year: "",
    search: "",
  });
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  useEffect(() => {
    setQuery((prev) => ({ ...prev, search: search }));
  }, [search]);
  useEffect(() => {
    dispatch(getAllMoviesByQueryAction(query)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setMovieData(result.payload.movies);
        setTotalMovies(result.payload.totalMovies);
        setPages(result.payload.pages);
      }
    });
  }, [query, useState.isAddFavoriting, userState.isLoading]);
  return (
    <Layout setQuery={setQuery} query={query}>
      <div className="container mx-auto">
        <Filters setQuery={setQuery} query={query}></Filters>
        {movieState.isLoading && (
          <div className="h-96">
            <Loading />
          </div>
        )}
        {movieData.length > 0 && (
          <ResultFilter
            movieData={movieData}
            totalMovies={totalMovies}
            setQuery={setQuery}
            query={query}
            pages={pages}
          ></ResultFilter>
        )}
        {movieState.isLoading ? (
          ""
        ) : movieData.length > 0 ? (
          ""
        ) : (
          <Empty title="Not Movies yet"></Empty>
        )}
      </div>
    </Layout>
  );
};

export default Movies;
