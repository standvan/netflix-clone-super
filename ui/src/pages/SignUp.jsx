import React, { useState } from "react";
import Layout from "../layout/Layout";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { validateRegisterForm } from "../validate";
import { registerAction } from "../redux/slice/userSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const userState = useSelector((state) => state.user);
  const dispacth = useDispatch();
  const navigate = useNavigate();
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
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
    const validateErrors = validateRegisterForm(trimedData);
    setErrors(validateErrors);
    if (!Object.keys(validateErrors).length) {
      dispacth(registerAction(trimedData)).then((result) => {
        if (result.error) {
          toast.error(result.payload.message);
        } else {
          setFormData({ email: "", password: "", fullname: "" });
          toast.success("Register and Login Success");
          localStorage.setItem("infoUser", JSON.stringify(result.payload));
          navigate("/update-pro");
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
                FullName
              </label>
              <input
                type="text"
                className="rounded border border-border bg-main p-4"
                placeholder="Enter fullname"
                name="fullname"
                value={formData.value}
                onChange={handleChange}
                required
              />
              <p className="pl-2 text-sm text-subMain">{errors.fullname}</p>
            </div>

            <div className="flex w-full flex-col gap-3">
              <label htmlFor="" className="font-semibold text-border">
                Email
              </label>
              <input
                type="email"
                className="rounded border border-border bg-main p-4"
                placeholder="Enter email"
                name="email"
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
                required
              />
              <p className="pl-2 text-sm text-subMain">{errors.password}</p>
            </div>
            <button
              className="flex-btn transitions w-full rounded bg-subMain py-4 hover:bg-main"
              type="submit"
            >
              {userState.isLoading ? "Loading..." : "Sign Up"}
            </button>
            <div className="flex-rows gap-4 text-border">
              Already have an account?
              <Link className="font-semibold text-text" to="/login">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
