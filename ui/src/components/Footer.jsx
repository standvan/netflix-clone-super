import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Footer = () => {
  const Lists = [
    {
      title: "Company",
      child: [
        {
          title: "Home",
          link: "/",
        },
        {
          title: "About Us",
          link: "/about-us",
        },
        {
          title: "Contact Us",
          link: "/contact-us",
        },
        {
          title: "Movies",
          link: "/movies",
        },
      ],
    },
    {
      title: "Top Categories",
      child: [
        {
          title: "Action",
          link: "/action",
        },
        {
          title: "Romantic",
          link: "/romantic",
        },
        {
          title: "Drama",
          link: "/drama",
        },
        {
          title: "Historial",
          link: "/historial",
        },
      ],
    },
    {
      title: "My Account",
      child: [
        {
          title: "Dashboard",
          link: "/dashboard",
        },
        {
          title: "My Favorites",
          link: "/favorites-movies",
        },
        {
          title: "Profile",
          link: "/update-pro",
        },
        {
          title: "Change Password",
          link: "/change-password",
        },
      ],
    },
  ];
  return (
    <div className="mb-12 grid grid-cols-2 gap-5 gap-y-10 bg-dry px-8 py-12 lg:mb-0 lg:grid-cols-4 lg:gap-10">
      {Lists.map((List, index) => (
        <div className="col-span-1 flex flex-col gap-5" key={index}>
          <h1 className="text-lg">{List.title}</h1>
          <ul className=" text-md flex flex-col gap-3 font-medium">
            {List.child.map((li, index) => (
              <li className="text-border hover:text-subMain" key={index}>
                <Link to={li.link}>{li.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex flex-col">
        <Link to="/">
          <img src={Logo} alt="" className="h-20 w-3/4 object-contain" />
        </Link>
        <p className="text-sm leading-7 text-border">
          Lorem 196 Andrew Road, Suite 200, New York, NY 10007
        </p>
        <p className="text-sm leading-7 text-border">Tell: +255 754 661 423</p>
        <p className="text-sm leading-7 text-border">Email: info@zpunet.com</p>
      </div>
    </div>
  );
};

export default Footer;
