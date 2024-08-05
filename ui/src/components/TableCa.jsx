import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteCategoryAction } from "../redux/slice/categorySlice";
import toast from "react-hot-toast";

const Rows = ({ category, OnEditFunction }) => {
  const dispatch = useDispatch();
  const deleteHanle = (id) => {
    dispatch(deleteCategoryAction(id)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
      }
    });
  };
  const Text =
    "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 truncate";
  return (
    <tr>
      <td className={Text}>{category._id}</td>
      <td className={Text}>
        {moment(category.createdAt).format("MMMM do yyyy")}
      </td>
      <td className={Text}>{category.title}</td>
      <td className={`flex-rows gap-3 py-6 text-sm text-text`}>
        <button
          className="flex-btn gap-2 rounded-lg border border-border px-2 py-1"
          onClick={() => OnEditFunction(category)}
        >
          Edit <FaEdit className="h-4 w-4 text-green-500"></FaEdit>
        </button>
        <button
          className="flex-btn h-7 w-7 rounded bg-subMain"
          onClick={() => deleteHanle(category._id)}
        >
          <MdDelete></MdDelete>
        </button>
      </td>
    </tr>
  );
};
const TableCa = ({ data, OnEditFunction }) => {
  const Head = "text-xs uppercase text-main px-6 py-2 text-left";
  const Text =
    "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 truncate";
  return (
    <div className="h-96 w-full overflow-x-scroll overflow-y-scroll ">
      <table className="w-full table-auto border border-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={Head}>
              Id
            </th>
            <th scope="col" className={Head}>
              Date
            </th>
            <th scope="col" className={Head}>
              Title
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main">
          {data.map((category, index) => (
            <Rows
              key={index}
              category={category}
              OnEditFunction={OnEditFunction}
            ></Rows>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCa;
