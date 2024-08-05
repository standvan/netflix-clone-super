import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";
import MainDrawer from "./drawers/MainDrawer";

const MobileFooter = () => {
  const active = "bg-white text-main";
  const inActive =
    "flex-btn transitions rounded-lg px-2 py-3 hover:bg-white hover:text-main";
  const Hover = ({ isActive }) => {
    return isActive ? `${active} ${inActive}` : inActive;
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed bottom-0 flex w-full flex-row justify-between bg-main px-1 py-2 lg:hidden">
        <NavLink to="/" className={Hover}>
          <BsCollectionPlay className="h-6 w-16"></BsCollectionPlay>
        </NavLink>
        <NavLink to="/favorites-movies" className={Hover}>
          <div className="relative">
            <div className="absolute -right-16 -top-10 rounded-full bg-subMain px-3 py-1 text-white">
              3
            </div>
          </div>
          <FaHeart className="h-6 w-16"></FaHeart>
        </NavLink>
        <NavLink to="/login" className={Hover}>
          <FiUserCheck className="h-6 w-16"></FiUserCheck>
        </NavLink>
        <button className={inActive} onClick={() => setOpen(true)}>
          <CgMenuBoxed className="h-6 w-16"></CgMenuBoxed>
        </button>
        <MainDrawer open={open} setOpen={setOpen}></MainDrawer>
      </div>
    </>
  );
};

export default MobileFooter;
