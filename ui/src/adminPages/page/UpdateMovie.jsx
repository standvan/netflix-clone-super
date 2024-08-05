import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Uploader from "../../components/Uploader";
import { MdDelete, MdEdit } from "react-icons/md";
import { ImUpload } from "react-icons/im";

import CastModal from "../../components/modal/CastModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryAction } from "../../redux/slice/categorySlice";
import toast from "react-hot-toast";
import { validateMovie } from "../../validate";
import {
  getMovieByIdAction,
  updateMovieAction,
} from "../../redux/slice/movieSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieState = useSelector((state) => state.movie);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageWithOutTitle, setImageWithOutTitle] = useState("");
  const [imageWithTitle, setImageWithTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [cast, setCast] = useState();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    language: "",
    year: "",
    image: "",
    desc: "",
    titleImage: "",
    category: "",
    video: "",
    casts: [],
  });
  const dispatch = useDispatch();
  const onEditCast = (cast) => {
    setCast(cast);
    setModalOpen(!modalOpen);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimedData = {
      name: formData.name.trim(),
      time: String(formData.time).trim(),
      language: formData.language.trim(),
      year: String(formData.year).trim(),
      desc: formData.desc.trim(),
      titleImage: formData.titleImage.trim(),
      image: formData.image.trim(),
      video: formData.video.trim(),
      category: formData.category.trim(),
      casts: formData.casts,
      id: id,
    };
    const validateErrors = validateMovie(trimedData);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      dispatch(updateMovieAction(trimedData)).then((result) => {
        if (result.error) {
          toast.error(result.payload.message);
        } else {
          toast.success(result.payload.message);
        }
      });
    }
  };
  useEffect(() => {
    dispatch(getMovieByIdAction(id)).then((result) => {
      if (result.error) {
      } else {
        setFormData({
          ...formData,
          name: result.payload.name,
          time: result.payload.time,
          language: result.payload.language,
          year: result.payload.year,
          titleImage: result.payload.titleImage,
          image: result.payload.image,
          video: result.payload.video,
          casts: result.payload.casts,
          desc: result.payload.desc,
          category: result.payload.category,
        });
      }
    });
  }, [movieState.isUpdating]);
  useEffect(() => {
    dispatch(getAllCategoryAction()).then((result) => {
      if (result.error) {
        toast.error(result.payload.message);
      } else {
        setCategoryData(result.payload);
      }
    });
  }, []);
  useEffect(() => {
    setFormData({ ...formData, image: imageWithOutTitle });
  }, [imageWithOutTitle]);
  useEffect(() => {
    setFormData({ ...formData, titleImage: imageWithTitle });
  }, [imageWithTitle]);
  useEffect(() => {
    setFormData({ ...formData, video: videoUrl });
  }, [videoUrl]);
  useEffect(() => {
    if (modalOpen === false) {
      setCast();
    }
  }, [modalOpen]);
  return (
    <SideBar>
      <CastModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
        setCastList={setFormData}
        castList={formData}
      ></CastModal>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold">Update Movie</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold text-border">
              Movie Title
            </label>
            <input
              type="text"
              placeholder="Game Of Thrones"
              className="rounded border border-border bg-main p-3 text-sm"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <p className="pl-2 text-sm font-semibold text-subMain">
              {errors.name}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold text-border">
              Hours
            </label>
            <input
              type="text"
              placeholder="2"
              className="rounded border border-border bg-main p-3 text-sm"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
            <p className="pl-2 text-sm font-semibold text-subMain">
              {errors.time}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold text-border">
              Language Used
            </label>
            <input
              type="text"
              placeholder="English"
              className="rounded border border-border bg-main p-3 text-sm"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
            <p className="pl-2 text-sm font-semibold text-subMain">
              {errors.language}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold text-border">
              Year of Release
            </label>
            <input
              type="text"
              placeholder="2022"
              className="rounded border border-border bg-main p-3 text-sm"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
            <p className="pl-2 text-sm font-semibold text-subMain">
              {errors.year}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold text-border">
              Image without Title
            </label>
            <Uploader setImageUrl={setImageWithOutTitle}></Uploader>
            <div className="h-32 w-32 rounded-lg border border-border p-1">
              {formData.image === "" ? (
                ""
              ) : (
                <img
                  src={formData.image}
                  alt=""
                  className="h-full w-full rounded-lg object-cover"
                />
              )}
            </div>
            <p className="pl-2 text-sm font-semibold text-subMain">
              {errors.image}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold text-border">
              Image with Title
            </label>
            <Uploader setImageUrl={setImageWithTitle}></Uploader>
            <div className="h-32 w-32 rounded-lg border border-border p-1">
              {formData.titleImage === "" ? (
                ""
              ) : (
                <img
                  src={formData.titleImage}
                  alt=""
                  className="h-full w-full rounded-lg object-cover"
                />
              )}
            </div>
            <p className="pl-2 text-sm font-semibold text-subMain">
              {errors.titleImage}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-border">
            Movie Description
          </label>
          <textarea
            name="desc"
            id=""
            className="h-48 rounded-lg border border-border bg-main p-3 text-sm"
            placeholder="Make it short and sweet"
            value={formData.desc}
            onChange={handleChange}
          ></textarea>
          <p className="pl-2 text-sm font-semibold text-subMain">
            {errors.desc}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-border">
            Movie Category
          </label>
          <select
            name="category"
            id=""
            className="w-full rounded-lg border border-border bg-main p-3 text-sm"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Choose category</option>
            {categoryData.map((category, index) => (
              <option value={category.title} key={index}>
                {category.title}
              </option>
            ))}
          </select>
          <p className="pl-2 text-sm font-semibold text-subMain">
            {errors.category}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-border">
            Movie Video
          </label>
          <Uploader setImageUrl={setVideoUrl}></Uploader>
          <div className="w-full rounded-lg border border-border p-4">
            {formData.video === "" ? (
              "Not video"
            ) : (
              <video className="w-full" controls>
                <source src={formData.video} type="video/mp4" />
              </video>
            )}
          </div>
          <p className="pl-2 text-sm font-semibold text-subMain">
            {errors.video}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div
            className="flex-rows h-16 cursor-pointer rounded border border-dashed border-subMain bg-main p-3"
            onClick={() => setModalOpen(true)}
          >
            Add Cast
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-3">
            {formData.casts.length === 0
              ? "No cast"
              : formData.casts.map((cas, index) => (
                  <div
                    className="flex-colo gap-2 rounded border border-border p-2"
                    key={index}
                  >
                    <img
                      src={cas.image}
                      alt=""
                      className="h-24 w-full rounded object-cover"
                    />
                    <h1 className="text-xs text-text">{cas.name}</h1>
                    <div className="flex-btn gap-2">
                      <div className="flex-btn h-6 w-6 cursor-pointer rounded-md border border-border text-subMain">
                        <MdDelete></MdDelete>
                      </div>
                      <div
                        className="flex-btn h-6 w-6 cursor-pointer rounded-md border border-border text-green-600"
                        onClick={() => onEditCast(cas)}
                      >
                        <MdEdit></MdEdit>
                      </div>
                    </div>
                  </div>
                ))}
            {/* <div className="flex-colo gap-2 rounded border border-border p-2">
              <img
                src="https://netflixo.vercel.app/images/c1.png"
                alt=""
                className="h-24 w-full rounded object-cover"
              />
              <h1 className="text-xs text-text">Tom Cruise</h1>
              <div className="flex-btn gap-2">
                <div className="flex-btn h-6 w-6 cursor-pointer rounded-md border border-border text-subMain">
                  <MdDelete></MdDelete>
                </div>
                <div
                  className="flex-btn h-6 w-6 cursor-pointer rounded-md border border-border text-green-600"
                  onClick={() => setModalOpen(true)}
                >
                  <MdEdit></MdEdit>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <button
          className="flex-btn cursor-pointer gap-3 rounded bg-subMain p-3"
          type="submit"
        >
          <ImUpload></ImUpload>Publish Movie
        </button>
      </form>
    </SideBar>
  );
};

export default UpdateMovie;
