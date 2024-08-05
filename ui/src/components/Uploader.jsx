import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loading from "./Loading";
import { uploadImageService } from "../redux/apis/uploadImageService";

const Uploader = ({ setImageUrl }) => {
  const [loading, setLoading] = useState(false);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      // Xử lý file khi được thả vào dropzone
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const url = await uploadImageService(formData, setLoading);
      setImageUrl(url);
    },
    [setImageUrl],
  );
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });
  return loading ? (
    <Loading></Loading>
  ) : (
    <div
      {...getRootProps()}
      className="flex-colo h-36 w-full rounded-lg border-2 border-dashed border-border bg-main"
    >
      <input {...getInputProps} className="hidden" />
      <span className="flex-colo gap-3">
        <FiUploadCloud className="text-3xl text-subMain"></FiUploadCloud>
        <p className="text-text">Drag your image here</p>
        <em className="text-sm text-border">
          (only .jpg and .png files will be accepted)
        </em>
      </span>
    </div>
  );
};

export default Uploader;
