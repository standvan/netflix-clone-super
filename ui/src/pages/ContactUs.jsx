import React from "react";
import Layout from "../layout/Layout";
import HeadImg from "../assets/head.png";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";

const ContactUs = () => {
  const contactList = [
    {
      icon: <CiMail></CiMail>,
      title: "Email Us",
      info: "Interactively grow backend ideas for cross-platform models.",
      contact: "info@zpunet.com",
    },
    {
      icon: <FaPhone></FaPhone>,
      title: "Call Us",
      info: "Distinctively exploit optimal alignments for intuitive bandwidth.",
      contact: "+255 789 456 123",
    },
    {
      icon: <CiLocationOn></CiLocationOn>,
      title: "Location",
      info: "Dar es salaam, Tanzania. 345 Kigamboni, Street No. 12",
      contact: "",
    },
  ];
  return (
    <Layout>
      <div className="container relative mx-auto overflow-hidden rounded-lg">
        <img
          src={HeadImg}
          alt=""
          className="h-48 w-full object-cover lg:h-64"
        />
        <div className="flex-btn absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60 text-xl font-bold lg:text-4xl">
          Contact Us
        </div>
      </div>
      <div className="container mx-auto my-10 grid grid-cols-1 gap-8 px-4 lg:grid-cols-3 lg:px-0">
        {contactList.map((e, index) => (
          <div
            className="flex-colo gap-7 rounded-lg border border-border bg-dry px-4 py-8 text-center"
            key={index}
          >
            <div className="flex-btn rounded-full bg-main p-7 text-3xl text-subMain">
              {e.icon}
            </div>
            <h1 className="text-xl font-bold">{e.title}</h1>
            <p className="text-sm leading-6 text-text">
              <a href={`mailto:${e.contact}`} className="text-blue-700">
                {e.contact}
              </a>{" "}
              Interactively grow backend ideas for cross-platform models.
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ContactUs;
