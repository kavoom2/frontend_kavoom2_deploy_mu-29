"use client";

import { memo } from "react";
import { ToastContainer, ToastContainerProps, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const inheritedToastProps: ToastContainerProps = {
  position: toast.POSITION["BOTTOM_CENTER"],
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: "light",
};

const RootIsolatedComponents = memo(() => {
  return (
    <>
      <ToastContainer {...inheritedToastProps} />
    </>
  );
});

export default RootIsolatedComponents;
