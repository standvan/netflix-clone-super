import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiDownloadCloud } from "react-icons/fi";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteMovieByIdAction } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const Rows = ({ movie }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const Text =
    "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 truncate";
  const deleteMovieByIdHandle = (id) => {
    dispatch(deleteFavoriteMovieByIdAction(id)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
      }
    });
  };
  return (
    <tr>
      <td className={Text}>
        <div className="h-14 w-14 rounded border border-border p-1">
          <img
            src={movie.titleImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </td>
      <td className={Text}>{movie.name}</td>
      <td className={Text}>{movie.category}</td>
      <td className={Text}>{movie.language}</td>
      <td className={Text}>{movie.year}</td>
      <td className={Text}>{movie.time}</td>
      <td className={`flex-rows gap-3 py-6 text-sm text-text`}>
        <button className="flex-btn gap-2 rounded-lg border border-border px-2 py-1">
          Download{" "}
          <FiDownloadCloud className="h-4 w-4 text-green-500"></FiDownloadCloud>
        </button>
        <button className="flex-btn h-7 w-7 rounded bg-subMain">
          <IoMdEye></IoMdEye>
        </button>
        <button
          className="flex-btn h-7 w-7 rounded bg-subMain"
          onClick={() => deleteMovieByIdHandle(movie._id)}
        >
          <MdDelete></MdDelete>
        </button>
      </td>
    </tr>
  );
};
const Table = ({ data }) => {
  const Head = "text-xs uppercase text-main px-6 py-2 text-left";

  return (
    <div className="h-96 w-full overflow-x-scroll overflow-y-scroll ">
      <table className="w-full table-auto border border-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={Head}>
              Image
            </th>
            <th scope="col" className={Head}>
              Name
            </th>
            <th scope="col" className={Head}>
              Category
            </th>
            <th scope="col" className={Head}>
              Language
            </th>
            <th scope="col" className={Head}>
              Year
            </th>
            <th scope="col" className={Head}>
              Hours
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main">
          {data.map((movie, index) => (
            <Rows key={index} movie={movie}></Rows>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
