import React, { useCallback, useEffect, useState } from "react";
import { categoriesData } from "../data/categoriesData";
import { getAllCategoryAction } from "../redux/slice/categorySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  getAllLanguageAction,
  getAllMoviesByQueryAction,
  getAllYearAction,
} from "../redux/slice/movieSlice";

// const YearData = [
//   { title: "1700-1800" },
//   { title: "1800-1900" },
//   { title: "1900-2000" },
//   { title: "2000-2010" },
//   { title: "2010-2030" },
// ];
const TimeData = [{ title: 1 }, { title: 2 }, { title: 3 }, { title: 4 }];
// const LanguageData = [
//   { title: "English" },
//   { title: "French" },
//   { title: "Italia" },
// ];
const Filters = ({ query, setQuery }) => {
  const [categoryData, setCategoryData] = useState({});
  const [languageData, setLanguageData] = useState({});
  const [yearData, setYearData] = useState({});
  const dispatch = useDispatch();
  const handleSelectChange = useCallback((e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  });
  useEffect(() => {
    dispatch(getAllCategoryAction()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setCategoryData(result.payload);
      }
    });
    dispatch(getAllLanguageAction()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setLanguageData(result.payload);
      }
    });
    dispatch(getAllYearAction()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setYearData(result.payload);
      }
    });
  }, []);
  return (
    <div className="my-6 grid gap-8 rounded-lg border border-border bg-dry p-6 md:grid-cols-2 lg:grid-cols-4">
      <select
        className="rounded border border-border bg-main px-4 py-2 text-sm"
        name="category"
        value={query.category}
        onChange={handleSelectChange}
      >
        <option value="">All Category</option>
        {Object.keys(categoryData).length > 0 &&
          categoryData.map((cate, index) => (
            <option value={cate.title} key={index}>
              {cate.title}
            </option>
          ))}
      </select>
      <select
        className="rounded border border-border bg-main px-4 py-2 text-sm"
        name="language"
        value={query.language}
        onChange={handleSelectChange}
      >
        <option value="">Sort By Language</option>
        {Object.keys(languageData).length > 0 &&
          languageData.map((lan, index) => (
            <option value={lan.title} key={index}>
              {lan.title}
            </option>
          ))}
      </select>
      <select
        className="rounded border border-border bg-main px-4 py-2 text-sm"
        name="year"
        value={query.year}
        onChange={handleSelectChange}
      >
        <option value="">Sort By Year</option>
        {Object.keys(yearData).length > 0 &&
          yearData.map((ye, index) => (
            <option value={ye.title} key={index}>
              {ye.title}
            </option>
          ))}
      </select>
      <select
        className="rounded border border-border bg-main px-4 py-2 text-sm"
        name="time"
        value={query.time}
        onChange={handleSelectChange}
      >
        <option value="">Sort By Hours</option>
        {TimeData.map((ti, index) => (
          <option value={ti.title} key={index}>
            {ti.title} hours
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
