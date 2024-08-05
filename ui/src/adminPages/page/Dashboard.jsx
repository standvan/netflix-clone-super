import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import TableMo from "../../components/TableMo";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { getAllCategoryAction } from "../../redux/slice/categorySlice";
import toast from "react-hot-toast";
import { getAllUsersAction } from "../../redux/slice/userSlice";
import { getAllMoviesByQueryAction } from "../../redux/slice/movieSlice";

const Dashboard = () => {
  const [DashBoardData, setDashBoardData] = useState([
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: 1,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total categories",
      total: 1,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: 1,
    },
  ]);
  const [movieData, setMovieData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersAction()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setDashBoardData((prevData) => {
          return prevData.map((data, index) => {
            return index === 2
              ? { ...data, total: result.payload.length }
              : data;
          });
        });
      }
    });
  }, []);
  useEffect(() => {
    dispatch(getAllCategoryAction()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setDashBoardData((prevData) => {
          return prevData.map((data, index) => {
            return index === 1
              ? { ...data, total: result.payload.length }
              : data;
          });
        });
      }
    });
  }, []);
  useEffect(() => {
    dispatch(
      getAllMoviesByQueryAction({
        category: "",
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
        setDashBoardData((prevData) => {
          return prevData.map((data, index) => {
            return index === 0
              ? { ...data, total: result.payload.totalMovies }
              : data;
          });
        });
        setMovieData(result.payload.movies);
      }
    });
  }, []);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">DashBoard</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          {DashBoardData.map((item, index) => (
            <div className="flex gap-6 rounded-md bg-main p-6" key={index}>
              <div className={`${item.bg} flex-btn h-12 w-12 rounded-full`}>
                <item.icon></item.icon>
              </div>
              <div className="flex flex-col gap-3">
                <p>{item.title}</p>
                <p className="font-semibold">{item.total}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-border">Recent Movies</h1>
          <TableMo data={movieData}></TableMo>
        </div>
      </div>
    </SideBar>
  );
};

export default Dashboard;
