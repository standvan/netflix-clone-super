import React, { useState } from "react";
import SideBar from "../SideBar";
import { validateChangePass } from "../../validate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassAction } from "../../redux/slice/userSlice";
import toast from "react-hot-toast";

const ChangePass = () => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validateChangePass(formData);
    setErrors(validateErrors);
    if (!Object.keys(validateErrors).length) {
      let dataPassword = {
        password: formData.password,
        newPassword: formData.newPassword,
      };
      dispatch(changePassAction(dataPassword)).then((result) => {
        if (result.error) {
          toast.error(result.payload.message);
        } else {
          toast.success(result.payload.message);
          navigate("/update-pro");
        }
      });
    }
  };
  return (
    <SideBar>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold">Change Password</h1>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-border">
            Previos Password
          </label>
          <input
            type="password"
            className="rounded bg-main p-4"
            placeholder="**********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="pl-2 text-sm font-semibold text-subMain">
            {errors.password}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-border">
            New Password
          </label>
          <input
            type="password"
            className="rounded bg-main p-4"
            placeholder="**********"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <p className="pl-2 text-sm font-semibold text-subMain">
            {errors.newPassword}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-border">
            Confirm Password
          </label>
          <input
            type="password"
            className="rounded bg-main p-4"
            placeholder="**********"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <p className="pl-2 text-sm font-semibold text-subMain">
            {errors.confirmPassword}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="flex-btn transitions cursor-pointer rounded border border-subMain p-3 hover:bg-subMain"
            type="submit"
          >
            {userState.isLoading ? "Loading..." : "Change Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default ChangePass;
