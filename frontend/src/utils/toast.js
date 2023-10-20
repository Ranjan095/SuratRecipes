/** @format */

import { toast } from "react-toastify";

//** Success toast */
export let TOAST_SUCCESS = (message) => {
  return toast.success(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

/** Error toast */
export let TOAST_ERROR = (message) => {
  return toast.error(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
