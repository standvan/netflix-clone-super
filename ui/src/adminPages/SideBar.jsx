import React, { useState } from "react";
import Layout from "../layout/Layout";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUser } from "react-icons/fa";
import {
  RiLockPasswordLine,
  RiLogoutCircleLine,
  RiMovie2Fill,
} from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/slice/userSlice";
import toast from "react-hot-toast";
const SideBar = ({ children }) => {
  const isAdmin = JSON.parse(localStorage.getItem("infoUser")).isAdmin;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SideLink = isAdmin
    ? [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: BsFillGridFill,
        },
        {
          name: "Movies List",
          link: "/movies-list",
          icon: FaListAlt,
        },
        {
          name: "Add movie",
          link: "/add-movie",
          icon: RiMovie2Fill,
        },
        {
          name: "Categories",
          link: "/categories",
          icon: HiViewGridAdd,
        },
        {
          name: "Users",
          link: "/users",
          icon: FaUser,
        },
        {
          name: "Update Profile",
          link: "/update-pro",
          icon: FiSettings,
        },
        {
          name: "Favorites Movies",
          link: "/favorites-movies",
          icon: FaHeart,
        },
        {
          name: "Change Password",
          link: "/change-password",
          icon: RiLockPasswordLine,
        },
      ]
    : [
        {
          name: "Update Profile",
          link: "/update-pro",
          icon: FiSettings,
        },
        {
          name: "Favorites Movies",
          link: "/favorites-movies",
          icon: FaHeart,
        },
        {
          name: "Change Password",
          link: "/change-password",
          icon: RiLockPasswordLine,
        },
      ];
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
    toast.success("Logout successfully");
  };
  const [isActive, setIsActive] = useState(false);
  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive = "rounded w-full flex flex-row p-4 items-center gap-3";
  const Hover = ({ isActive }) => {
    return isActive ? `${active} ${inActive}` : `${hover} ${inActive}`;
  };
  return (
    <Layout>
      <div className="mx-auto min-h-screen w-full bg-main">
        <div className="container mx-auto grid grid-cols-1 gap-8 py-10 md:py-20 lg:grid-cols-8">
          <div className="h-auto bg-transparent lg:col-span-2">
            <div className="flex-colos h-auto w-full rounded-lg border-border bg-dry p-4">
              {SideLink.map((link, index) => (
                <NavLink className={Hover} to={link.link} key={index}>
                  <link.icon></link.icon>
                  {link.name}
                </NavLink>
              ))}
              <div
                className={`${inActive} ${hover}`}
                onClick={() => handleLogout()}
              >
                <RiLogoutCircleLine></RiLogoutCircleLine>
                Log out
              </div>
            </div>
          </div>
          <div
            className="rounded-lg bg-dry p-4 lg:col-span-6"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SideBar;
