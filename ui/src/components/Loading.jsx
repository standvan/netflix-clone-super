import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex-colo">
      <PuffLoader color="#f20000"></PuffLoader>
    </div>
  );
};

export default Loading;
