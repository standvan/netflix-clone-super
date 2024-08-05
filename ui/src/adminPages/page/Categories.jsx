import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { FaPlus } from "react-icons/fa";
import TableCa from "../../components/TableCa";
import Loading from "../../components/Loading";
// import { categoriesData } from "../../data/categoriesData";
import CategoryModal from "../../components/modal/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryAction } from "../../redux/slice/categorySlice";
import toast from "react-hot-toast";
import Empty from "../../components/Empty";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const [datas, setDatas] = useState({});
  const categoryState = useSelector((state) => state.category);
  const OnEditFunction = (ca) => {
    setCategory(ca);
    setModalOpen(!modalOpen);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen]);
  useEffect(() => {
    dispatch(getAllCategoryAction()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setDatas(result.payload);
      }
    });
  }, [
    categoryState.isCreating,
    categoryState.isEditing,
    categoryState.isDeleting,
  ]);
  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      ></CategoryModal>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Categories</h1>
          <div
            className="flex-btn transitions cursor-pointer gap-3 rounded border border-subMain p-3 hover:bg-subMain"
            onClick={() => setModalOpen(true)}
          >
            <FaPlus></FaPlus> Create
          </div>
        </div>
        {categoryState.isLoading && (
          <div className="flex-colo h-32">
            <Loading />
          </div>
        )}
        {!categoryState.isLoading && Object.keys(datas).length > 0 && (
          <TableCa data={datas} OnEditFunction={OnEditFunction}></TableCa>
        )}
        {categoryState.isLoading ? (
          ""
        ) : Object.keys(datas).length > 0 ? (
          ""
        ) : (
          <Empty title="You have not favorites movies"></Empty>
        )}
      </div>
    </SideBar>
  );
};

export default Categories;
