import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      limit={3}
      theme="light"
    />
  );
};

export const showToast = (
  message: string,
  type: "success" | "error" = "error"
) => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

export default Toast;
