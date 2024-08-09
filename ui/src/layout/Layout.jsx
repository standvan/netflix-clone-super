import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileFooter from "../components/MobileFooter";

const Layout = ({ children, setQuery, query }) => {
  return (
    <>
      <div className="bg-main text-white">
        <Navbar setQuery={setQuery} query={query}></Navbar>
        {children}
        <Footer></Footer>
        <MobileFooter></MobileFooter>
      </div>
    </>
  );
};

export default Layout;
