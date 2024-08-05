import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileFooter from "../components/MobileFooter";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        <MobileFooter></MobileFooter>
      </div>
    </>
  );
};

export default Layout;
