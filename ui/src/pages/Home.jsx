import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Banner from "../components/Banner";
import PopularMovies from "../components/PopularMovies";
import Promos from "../components/Promos";
import TopRate from "../components/TopRate";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesRated,
  getRandomMoviesAction,
} from "../redux/slice/movieSlice";
import toast from "react-hot-toast";
const Home = () => {
  const dispatch = useDispatch();
  const [movieRandom, setMovieRandom] = useState([]);
  const [movieRated, setMovieRated] = useState([]);
  const userState = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getRandomMoviesAction()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setMovieRandom(result.payload);
      }
    });
  }, [userState.isAddFavoriting, userState.isLoading]);
  useEffect(() => {
    dispatch(getMoviesRated()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setMovieRated(result.payload);
      }
    });
  }, []);
  return (
    <>
      <Layout>
        <Banner movies={movieRandom}></Banner>
        <PopularMovies movies={movieRandom}></PopularMovies>
        <Promos></Promos>
        <TopRate movies={movieRated}></TopRate>
      </Layout>
    </>
  );
};

export default Home;
