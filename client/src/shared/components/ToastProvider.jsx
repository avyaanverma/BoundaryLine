import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName="!bg-[#1a1d20] !border !border-[#38423d] !text-[#eef2ef] !shadow-2xl"
      progressClassName="!bg-[#9adca7]"
    />
  );
};

export default ToastProvider;
