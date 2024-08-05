import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../SideBar";
import Uploader from "../../components/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction, updateAction } from "../../redux/slice/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const userStorage = JSON.parse(localStorage.getItem("infoUser"));
  const userState = useSelector((state) => state.user);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/netflix-pro-32b7c.appspot.com/o/f78a89ea-fc3a-4ca6-bc5b-61bb7b06018a.png?alt=media",
  });
  useEffect(() => {
    setFormData({ ...formData, image: imageUrl });
  }, [imageUrl]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAction(formData)).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        toast.success("Updated Successfully");
        localStorage.setItem("infoUser", JSON.stringify(result.payload));
        navigate("/");
      }
    });
  };
  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your profile",
    );
    if (confirm) {
      dispatch(deleteAction()).then((result) => {
        if (result.error) {
          console.log(result);
        } else {
          toast.success(result.payload.message);
          localStorage.removeItem("infoUser");
          navigate("/login");
        }
      });
    }
  };
  useEffect(() => {
    setFormData({
      ...formData,
      fullname: userStorage.fullname,
      email: userStorage.email,
    });
  }, []);
  return (
    <SideBar>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold">Profile</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="md:col-span-4">
            <Uploader setImageUrl={setImageUrl}></Uploader>
          </div>
          <div className="flex-colo rounded-lg border-2 border-dashed border-border p-4">
            {imageUrl ? (
              <img src={imageUrl} className="h-28 w-28 object-cover"></img>
            ) : (
              <img
                src={userStorage.image}
                alt=""
                className="h-28 w-28 object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-border">
            Fullname
          </label>
          <input
            type="text"
            className="rounded bg-main p-4"
            placeholder={userStorage.fullname}
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-border">
            Email
          </label>
          <input
            type="email"
            className="rounded bg-main p-4"
            placeholder={userStorage.email}
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div
            className="flex-btn transitions cursor-pointer rounded border border-subMain bg-subMain p-3 hover:bg-transparent"
            onClick={() => handleDeleteAccount()}
          >
            {userState.isDeleting ? "Loading..." : "Delete Account"}
          </div>
          <button
            className="flex-btn transitions cursor-pointer rounded border border-subMain p-3 hover:bg-subMain"
            type="submit"
          >
            {userState.isLoading ? "Loading..." : "Update Account"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default UpdateProfile;
