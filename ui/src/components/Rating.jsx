import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const Rating = ({ value }) => {
  return (
    <>
      <span>
        {value >= 1 ? (
          <IoIosStar></IoIosStar>
        ) : value >= 0.5 ? (
          <IoIosStarHalf></IoIosStarHalf>
        ) : (
          <IoIosStarOutline></IoIosStarOutline>
        )}
      </span>
      <span>
        {value >= 2 ? (
          <IoIosStar></IoIosStar>
        ) : value >= 1.5 ? (
          <IoIosStarHalf></IoIosStarHalf>
        ) : (
          <IoIosStarOutline></IoIosStarOutline>
        )}
      </span>
      <span>
        {value >= 3 ? (
          <IoIosStar></IoIosStar>
        ) : value >= 2.5 ? (
          <IoIosStarHalf></IoIosStarHalf>
        ) : (
          <IoIosStarOutline></IoIosStarOutline>
        )}
      </span>
      <span>
        {value >= 4 ? (
          <IoIosStar></IoIosStar>
        ) : value >= 3.5 ? (
          <IoIosStarHalf></IoIosStarHalf>
        ) : (
          <IoIosStarOutline></IoIosStarOutline>
        )}
      </span>
      <span>
        {value >= 5 ? (
          <IoIosStar></IoIosStar>
        ) : value >= 4.5 ? (
          <IoIosStarHalf></IoIosStarHalf>
        ) : (
          <IoIosStarOutline></IoIosStarOutline>
        )}
      </span>
    </>
  );
};

export default Rating;
