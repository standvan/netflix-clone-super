import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";
import Aos from "aos";
import ScrollOnTop from "./ScrollOnTop";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./adminPages/page/Dashboard";
import MoviesList from "./adminPages/page/MoviesList";
import UpdateProfile from "./adminPages/page/UpdateProfile";
import ChangePass from "./adminPages/page/ChangePass";
import FavoritesMovies from "./adminPages/page/FavoritesMovies";
import Categories from "./adminPages/page/Categories";
import AddMovie from "./adminPages/page/AddMovie";
import toast, { Toaster } from "react-hot-toast";
import { AdminProtectedRoutes, ProtectedRoutes } from "./PrivateRouter";
import Users from "./adminPages/page/Users";
import UpdateMovie from "./adminPages/page/UpdateMovie";
import Watch from "./pages/Watch";
import CheckToken from "./CheckToken";
function App() {
  Aos.init();
  return (
    <>
      <Router>
        <Toaster></Toaster>
        <CheckToken />
        <ScrollOnTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movies/:id" element={<MovieDetails />}></Route>
          <Route path="/watch/:id" element={<Watch />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          {/* Private Router */}
          <Route element={<ProtectedRoutes></ProtectedRoutes>}>
            <Route path="/update-pro" element={<UpdateProfile />}></Route>
            <Route path="/change-password" element={<ChangePass />}></Route>
            <Route
              path="/favorites-movies"
              element={<FavoritesMovies />}
            ></Route>
          </Route>

          {/* Admin Router */}
          <Route element={<AdminProtectedRoutes></AdminProtectedRoutes>}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/movies-list" element={<MoviesList />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/add-movie" element={<AddMovie />}></Route>
            <Route path="/update-movie/:id" element={<UpdateMovie />}></Route>
            <Route path="/users" element={<Users />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
