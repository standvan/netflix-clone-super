import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const MainModal = ({ modalOpen, setModalOpen, children }) => {
  return (
    <Transition show={modalOpen} as={Fragment} appear>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setModalOpen(false)}
      >
        <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </TransitionChild>
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              {children}
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MainModal;
