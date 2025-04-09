"use client";

import { ToastContainer, ToastOptions, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const showToast = (
  message: string,
  type: "success" | "error" | "info" = "info",
  options?: ToastOptions
) => {
  toast(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
    ...options,
  });
};

const Toast = () => {
  return <ToastContainer />;
};

export { showToast, Toast };
