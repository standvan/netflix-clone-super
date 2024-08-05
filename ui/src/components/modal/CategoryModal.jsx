import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import MainModal from "./MainModal";
import {
  createCategoryAction,
  editCategoryAction,
} from "../../redux/slice/categorySlice";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "" });
  const handleChange = (e) => {
    setFormData({ title: e.target.value });
  };
  const updateHandle = (e) => {
    e.preventDefault();
    let eData = {
      id: category._id,
      title: formData.title,
    };
    dispatch(editCategoryAction(eData)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
      }
    });
    setModalOpen(false);
  };
  const createHandle = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction(formData)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
      }
    });
    setModalOpen(false);
  };
  useEffect(() => {
    if (category) {
      setFormData({ title: category.title });
    } else {
      setFormData({ title: "" });
    }
  }, [category]);
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <DialogPanel className="flex-colo w-full max-w-md gap-6 rounded-xl bg-main p-6 backdrop-blur-2xl">
        <DialogTitle as="h3" className="text-3xl font-semibold text-white">
          {category ? "Edit" : "Create"}
        </DialogTitle>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={category ? updateHandle : createHandle}
        >
          <label htmlFor="" className="text-sm font-semibold text-border">
            Category Name
          </label>
          <input
            type="text"
            className="w-full bg-dry p-3 text-white"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter category title"
          />
          <Button
            className="transitions w-full rounded-lg border-2 border-subMain bg-subMain p-4 text-white hover:bg-transparent"
            onClick={() => setModalOpen(false)}
            type="submit"
          >
            Update
          </Button>
        </form>
      </DialogPanel>
    </MainModal>
  );
};

export default CategoryModal;
