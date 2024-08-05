import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMoviesAction } from "../redux/slice/userSlice";

const Navbar = () => {
  const Hover = "hover:text-subMain transitions text-white";
  const infoUser = JSON.parse(localStorage.getItem("infoUser"));
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const favoritedMovies =
    JSON.parse(localStorage.getItem("favoritedMovies")) || [];
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/movies?search=${search}`);
    if (search) {
      setSearch(search);
    }
  };
  useEffect(() => {
    dispatch(getFavoriteMoviesAction()).then((result) => {
      if (result.error) {
        // toast.error(result.payload.message);
      } else {
        let arrayId = result.payload.map((item) => item._id);
        if (infoUser) {
          localStorage.setItem("favoritedMovies", JSON.stringify(arrayId));
        }
      }
    });
  }, [userState.isAddFavoriting, userState.isDeleting]);
  return (
    <div className="sticky top-0 z-10 bg-main shadow-md">
      <div className="grid-cols container mx-auto grid gap-10 px-2 py-4 lg:grid-cols-7 lg:p-0">
        <div className="col-span-1 hidden lg:flex">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="flex-btn col-span-3">
          <form
            className="flex-btn w-full overflow-hidden rounded bg-dryGray"
            onSubmit={handleSubmit}
          >
            <button className="h-12 rounded bg-subMain p-4">
              <FaSearch></FaSearch>
            </button>
            <input
              type="text"
              placeholder="Search name movie from here"
              className="text-bold h-12 flex-1 bg-dryGray p-4 text-black"
              name="search"
              value={search}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="col-span-3 hidden lg:flex">
          <ul className="flex-rows gap-14">
            <li className={Hover}>
              <Link to="/movies">Movies</Link>
            </li>
            <li className={Hover}>
              <Link to="/about-us">About Us</Link>
            </li>
            <li className={Hover}>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li className={Hover}>
              {infoUser ? (
                <Link to={infoUser.isAdmin ? "/dashboard" : "/update-pro"}>
                  <img
                    src={infoUser.image}
                    alt="icon user"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgUser className="h-8 w-8"></CgUser>
                </Link>
              )}
            </li>
            <li className={`${Hover} relative`}>
              <Link to="/favorites-movies">
                <FaHeart className="h-6 w-6"></FaHeart>
                <div className="flex-colo absolute -right-2 -top-5 h-5 w-5 rounded-full bg-subMain">
                  {favoritedMovies.length}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
