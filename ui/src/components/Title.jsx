import React from "react";

const Title = ({ title, Icon }) => {
  return (
    <h1 className="item-center flex gap-4 px-4 text-xl font-bold capitalize lg:p-0">
      <Icon className="h-6 w-6 text-subMain" />
      {title}
    </h1>
  );
};

export default Title;
