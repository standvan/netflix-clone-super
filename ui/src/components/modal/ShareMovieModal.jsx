import React from "react";
import MainModal from "./MainModal";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import {
  FaFacebook,
  FaMailBulk,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FacebookShareButton,
  MailruShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const ShareMovieModal = ({ modalOpen, setModalOpen, movie }) => {
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
  const url = `${window.location.protocol}//${window.location.port}/movies/${movie._id}`;
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <DialogPanel className="flex-colo w-full max-w-md gap-6 rounded-xl border border-border bg-main p-8 backdrop-blur-2xl">
        <h1 className="text-2xl text-white">
          Share <span className="font-semibold">"{movie.name}"</span>
        </h1>
        <form className="flex-rows gap-6">
          {shareData.map((data, index) => (
            <data.shareButton key={index} url={url}>
              <div className="transitions flex-colo h-12 w-12 rounded-lg bg-white bg-opacity-30 text-lg text-white hover:bg-subMain">
                <data.icon className=""></data.icon>
              </div>
            </data.shareButton>
          ))}
        </form>
      </DialogPanel>
    </MainModal>
  );
};

export default ShareMovieModal;
