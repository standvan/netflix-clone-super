import React from "react";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteUserByIdAction } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const Rows = ({ user }) => {
  const dispatch = useDispatch();
  const deleteUserHandle = (id) => {
    dispatch(deleteUserByIdAction(id)).then((result) => {
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
      <td className={Text}>
        <div className="h-14 w-14 rounded border border-border p-1">
          <img src={user.image} alt="" className="h-full w-full object-cover" />
        </div>
      </td>
      <td className={Text}>{moment(user.createdAt).format("MMMM Do YYYY")}</td>
      <td className={Text}>{user.fullname}</td>
      <td className={Text}>{user.email}</td>
      <td className={`flex-rows gap-3 py-6 text-sm text-text`}>
        <button
          className="flex-btn h-7 w-7 rounded bg-subMain"
          onClick={() => deleteUserHandle(user._id)}
        >
          <MdDelete></MdDelete>
        </button>
      </td>
    </tr>
  );
};
const TableUser = ({ datas }) => {
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
              Date
            </th>
            <th scope="col" className={Head}>
              Name
            </th>
            <th scope="col" className={Head}>
              Email
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-main">
          {datas.map((data, index) => (
            <Rows key={index} user={data}></Rows>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
