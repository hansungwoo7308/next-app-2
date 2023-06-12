import { setCredentials } from "lib/client/store/authSlice";
import { getData } from "lib/client/utils/fetchData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
export default function Layout({ children }: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken : ", accessToken);
    if (!accessToken) return;
    getData("authentication/check", accessToken)
      .then((response) => {
        const { username, accessToken } = response.data;
        dispatch(setCredentials({ username, accessToken }));
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
      });
  }, []);
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
}
