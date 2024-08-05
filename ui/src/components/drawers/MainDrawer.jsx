import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Logo from "../../assets/logo.png";
import { IoMdClose } from "react-icons/io";
import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";

import { NavLink } from "react-router-dom";
import {
  FacebookShareButton,
  MailruShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaMailBulk,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
const MainDrawer = ({ open, setOpen }) => {
  const shareData = [
    {
      icon: FaFacebook,
      shareButton: FacebookShareButton,
    },
    {
      icon: FaTwitter,
      shareButton: TwitterShareButton,
    },
    {
      icon: FaTelegram,
      shareButton: TelegramShareButton,
    },
    {
      icon: FaWhatsapp,
      shareButton: WhatsappShareButton,
    },
    {
      icon: FaPinterest,
      shareButton: PinterestShareButton,
    },
    {
      icon: FaMailBulk,
      shareButton: MailruShareButton,
    },
  ];
  const url = `${window.location.protocol}//${window.location.port}`;
  const inActive =
    "flex items-center gap-4 rounded-lg p-3 text-lg hover:bg-dryGray";
  const active = "text-subMain";
  const Hover = ({ isActive }) => {
    return isActive ? `${inActive} ${active}` : inActive;
  };
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="h-screen w-96 bg-main text-white">
        <div className="grid grid-cols-2 bg-dry">
          <img src={Logo} alt="" className="h-20 w-36" />
          <div className="flex items-center justify-end pr-2">
            <div
              className="transitions rounded-full bg-white p-4 text-lg text-subMain hover:bg-subMain hover:text-white"
              onClick={() => setOpen(false)}
            >
              <IoMdClose></IoMdClose>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 py-8 ">
          <NavLink className={Hover} to="/">
            <BsCollectionPlay></BsCollectionPlay>Movies
          </NavLink>
          <NavLink className={Hover} to="/about-us">
            <HiOutlineUserGroup></HiOutlineUserGroup> About Us
          </NavLink>
          <NavLink className={Hover} to="/contact-us">
            <BiPhoneCall></BiPhoneCall> Contact Us
          </NavLink>
        </div>
        <div className="flex-rows gap-3">
          {shareData.map((data, index) => (
            <data.shareButton key={index} url={url}>
              <div className="transitions flex-colo h-12 w-12 rounded-lg bg-white bg-opacity-30 text-lg text-white hover:bg-subMain">
                <data.icon className=""></data.icon>
              </div>
            </data.shareButton>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default MainDrawer;
