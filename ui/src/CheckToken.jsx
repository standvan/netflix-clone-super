import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckToken = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenExpiry = () => {
      const infoUser = JSON.parse(localStorage.getItem("infoUser"));
      if (infoUser) {
        const token = infoUser.token;
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            navigate("/login");
            toast.error("Token Expired");
            localStorage.removeItem("infoUser");
            localStorage.removeItem("favoritedMovies");
          }
        }
      }
    };
    checkTokenExpiry();
  }, [navigate]);
  return null;
};

export default CheckToken;
