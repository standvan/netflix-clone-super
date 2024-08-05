import React, { useState } from "react";
import Layout from "../layout/Layout";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginForm } from "../validate";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/slice/userSlice";
import toast from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimedData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
    const validateErrors = validateLoginForm(trimedData);
    setErrors(validateErrors);
    if (!Object.keys(validateErrors).length) {
      dispatch(loginAction(trimedData)).then((result) => {
        if (result.error) {
          toast.error(result.payload.message);
        } else {
          const infoUser = result.payload;
          localStorage.setItem("infoUser", JSON.stringify(infoUser));
          navigate("/update-pro");
          toast.success("User login successfully");
        }
      });
    }
  };
  return (
    <Layout>
      <div className="flex-colo container mx-auto px-2 py-12 md:py-24">
        <div className="flex-colo w-full rounded bg-dry px-0 py-10 md:w-3/5 md:px-14">
          <img src={Logo} alt="" className="w-32" />
          <form className="flex-colo w-full gap-8" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-3">
              <label htmlFor="" className="font-semibold text-border">
                Email
              </label>
              <input
                type="email"
                className="rounded border border-border bg-main p-4"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
              <p className="pl-2 text-sm text-subMain">{errors.email}</p>
            </div>

            <div className="flex w-full flex-col gap-3">
              <label htmlFor="" className="font-semibold text-border">
                Password
              </label>
              <input
                type="password"
                className="rounded border border-border bg-main p-4"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
              <p className="pl-2 text-sm text-subMain">{errors.password}</p>
            </div>
            <button
              className="flex-btn transitions w-full rounded bg-subMain py-4 hover:bg-main"
              type="submit"
            >
              {userState.isLoading ? "Loading..." : "Sign In"}
            </button>
            <div className="flex-rows gap-4 text-border">
              Don't have an account?
              <Link className="font-semibold text-text" to="/register">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
