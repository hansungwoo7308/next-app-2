import Modal from "./Modal";
import Notify from "../Notify";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <Notify />
      <Modal />
      <Loading />
      <ToastContainer
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
      />
      <LayoutGroup>
        <AnimatePresence
          initial={false}
          // mode="wait"
          // exitBeforeEnter
          // mode="popLayout"
          // onExitComplete={() => window.scrollTo(0, 0)}
        >
          {/* <motion.div
          key={router.asPath}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 200, ease: "linear" }}
        >
        </motion.div> */}
          {children}
        </AnimatePresence>
      </LayoutGroup>

      {/* <Footer /> */}
    </>
  );
}
