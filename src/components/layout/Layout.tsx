import { setCredentials } from "lib/client/store/authSlice";
import { getData } from "lib/client/utils/fetchData";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import Notify from "../Notify";
import Footer from "./Footer";
import Header from "./Header";
export default function Layout({ children }: any) {
  // const router = useRouter();
  // useEffect(() => {
  //   console.log("pathname : ", router.pathname);
  // }, [router.pathname]);
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
      <Notify />
      <Modal />
    </>
  );
}
