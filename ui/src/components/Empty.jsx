import React from "react";
import { RiMovie2Line } from "react-icons/ri";

const Empty = ({ title }) => {
  return (
    <div className="flex-colo h-96 gap-4">
      <RiMovie2Line className="h-16 w-16 text-subMain"></RiMovie2Line>
      {title}
    </div>
  );
};

export default Empty;
