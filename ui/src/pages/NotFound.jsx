import React from "react";
import img404 from "../assets/404.svg";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex-colo min-h-screen w-full gap-8 bg-main">
      <img src={img404} alt="" className="h-96 w-full" />
      <div className="text-3xl font-semibold text-white">Page not found</div>
      <div className="text-text">
        The page you are looking for does not exist. You may have mistyped the
        URL
      </div>
      <Link className="flex-btn transitions gap-4 rounded-lg bg-subMain p-4 text-white hover:text-border">
        <FaHome></FaHome>
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
