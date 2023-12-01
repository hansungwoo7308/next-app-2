import Modal from "./Modal";
import Notify from "../Notify";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";

export default function Layout({ children }: any) {
  return (
    <>
      {/* <Notify /> */}
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      <Loading />
      <Modal />
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
}
