import { setCredentials } from "lib/client/store/authSlice";
import { getData } from "lib/client/utils/fetchData";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import Notify from "../Notify";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";
export default function Layout({ children }: any) {
  // const router = useRouter();
  // useEffect(() => {
  //   console.log("pathname : ", router.pathname);
  // }, [router.pathname]);
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
      {children}
      {/* <Footer /> */}
    </>
  );
}
