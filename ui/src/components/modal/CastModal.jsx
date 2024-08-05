import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Button, DialogPanel, DialogTitle } from "@headlessui/react";
import Uploader from "../Uploader";

const CastModal = ({
  modalOpen,
  setModalOpen,
  cast,
  setCastList,
  castList,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (imageUrl !== "") {
      setFormData({ ...formData, image: imageUrl });
    }
  }, [imageUrl]);
  useEffect(() => {
    if (cast) {
      setFormData(cast);
    }
  }, [cast]);
  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (cast) {
      const updateListCast = castList.casts.map((cas) =>
        cas.image === formData.image ? formData : cas,
      );
      setCastList({ ...castList, casts: updateListCast });
      setModalOpen(false);
      setFormData({
        name: "",
        image: "",
      });
    } else {
      setCastList({ ...castList, casts: [...castList.casts, formData] });
      setModalOpen(false);
      setFormData({
        name: "",
        image: "",
      });
    }
  };
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <DialogPanel className="flex-colo w-full ">
        <form
          className="flex-colo w-full max-w-md gap-6 rounded-xl bg-main p-6 backdrop-blur-2xl"
          onSubmit={handleSubmitModal}
        >
          <DialogTitle as="h3" className="text-3xl font-semibold text-white">
            Cast
          </DialogTitle>
          <div className="flex w-full flex-col gap-4">
            <label htmlFor="" className="text-sm font-semibold text-border">
              Cast Name
            </label>
            <input
              type="text"
              className="w-full bg-dry p-3 text-white"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            <label htmlFor="" className="text-sm font-semibold text-border">
              Cast Image
            </label>
            <Uploader setImageUrl={setImageUrl}></Uploader>
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
          </div>
          <Button
            className="transitions w-full rounded-lg border-2 border-subMain bg-subMain p-4 text-white hover:bg-transparent"
            onClick={() => setModalOpen(false)}
            type="submit"
          >
            {cast ? "Update Cast" : "Add Cast"}
          </Button>
        </form>
      </DialogPanel>
    </MainModal>
  );
};

export default CastModal;
