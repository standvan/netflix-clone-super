import React from "react";
import { LuUser } from "react-icons/lu";
const Promos = () => {
  return (
    <div className="container mx-auto my-10 grid grid-cols-1 bg-dry lg:grid-cols-2 lg:p-8">
      <div className="flex flex-col gap-8 px-10 pt-4">
        <h1 className="font-sans text-xl font-medium capitalize lg:text-3xl">
          Download Your Movies Watch Offline. <br></br>Enjoy On Your Mobile
        </h1>
        <p className="text-sm leading-8 text-text lg:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries..
        </p>
        <div className="flex gap-4 text-lg font-bold text-subMain">
          <button className="flex-btn rounded bg-black px-5 py-3">HD 4K</button>
          <button className="flex-btn gap-2 rounded bg-black px-5 py-3">
            <LuUser></LuUser>2k
          </button>
        </div>
      </div>
      <div className="">
        <img
          src="https://netflixo.vercel.app/images/mobile.png"
          alt=""
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Promos;
