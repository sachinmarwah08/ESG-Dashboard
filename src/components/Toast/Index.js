import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyError = (message) =>
  toast(
    <p
      style={{
        fontSize: 16,
        margin: 0,
        fontFamily: "Sora",
      }}
    >
      {message}
    </p>,
    {
      position: "top-right",
      autoClose: 1500,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      theme: "colored",
      hideProgressBar: true,
      closeButton: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: "error",
    }
  );

export const notifySuccess = (message) =>
  toast(
    <p style={{ fontSize: 16, margin: 0, fontFamily: "Sora" }}>{message}</p>,
    {
      position: "top-right",
      autoClose: 1500,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      theme: "colored",
      hideProgressBar: true,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: "success",
    }
  );
