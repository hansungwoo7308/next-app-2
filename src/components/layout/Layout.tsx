import { setCredentials } from "lib/client/store/authSlice";
import { getData } from "lib/client/utils/fetchData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
}
