import React from "react";
import Layout from "../layout/Layout";
import HeadImg from "../assets/head.png";
import AboutImg from "../assets/about2.jpg";

const AboutUs = () => {
  return (
    <Layout>
      <div className="container relative mx-auto overflow-hidden rounded-lg">
        <img
          src={HeadImg}
          alt=""
          className="h-48 w-full object-cover lg:h-64"
        />
        <div className="flex-btn absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60 text-xl font-bold lg:text-4xl">
          About Us
        </div>
      </div>
      <div className="container mx-auto my-10 grid gap-20 p-4 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-semibold lg:text-3xl">
            Welcome to our Netflix
          </h1>
          <p className="text-sm leading-9 text-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. <br /> Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged.
          </p>
          <div className="flex flex-col gap-6 md:flex-row lg:flex-row">
            <div className="flex flex-col gap-4 rounded-lg bg-dry p-8">
              <h1 className="text-3xl font-bold">10k</h1>
              <h2 className="text-lg font-bold">Listed Movies</h2>
              <p className="text-sm text-text">
                Lorem Ipsum is simply dummy text of the printing and
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-dry p-8">
              <h1 className="text-3xl font-bold">8K</h1>
              <h2 className="text-lg font-bold">Lovely Users</h2>
              <p className="text-sm text-text">
                Completely free, without registration! Lorem Ipsum is simply
              </p>
            </div>
          </div>
        </div>
        <div className="hidden p-10 lg:flex">
          <img
            src={AboutImg}
            alt=""
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
