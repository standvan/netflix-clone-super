import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import TableUser from "../../components/TableUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../redux/slice/userSlice";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import Empty from "../../components/Empty";

const Users = () => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState({});
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const infoUser = JSON.parse(localStorage.getItem("infoUser"));
    if (infoUser) {
      dispatch(getAllUsersAction()).then((result) => {
        if (result.error) {
          toast.error(result.payload.message);
        } else {
          setDatas(result.payload);
        }
      });
    }
  }, [userState.isDeleting]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Users</h1>
        {userState.isLoading && (
          <div className="h-32">
            <Loading />
          </div>
        )}
        {Object.keys(datas).length > 0 && <TableUser datas={datas}></TableUser>}
        {userState.isLoading ? (
          ""
        ) : Object.keys(datas).length > 0 ? (
          ""
        ) : (
          <Empty title="No users yet" />
        )}
      </div>
    </SideBar>
  );
};

export default Users;
