import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { setCredentials } from "lib/client/store/authSlice";
import { useDispatch } from "react-redux";
export default function SessionLoader({ children }: any) {
  // next-auth를 사용하지 않는다면,
  // accessToken, refreshToken을 관리해야하고
  // accessToken을 redux store에 저장한다.
  // accessToken을 axios authorization header에 bearer token으로 default로 설정해준다.
  // refreshToken은 서버에서 이미 쿠키에 설정을 해준다.
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  // console.log("\x1b[33m");
  // console.log("[SessionLoader]");
  // console.log("session : ", session);
  // useEffect(() => {
  //   // console.log("status : ", status);
  //   if (status === "authenticated") {
  //     // dispatch(setCredentials())
  //   } else if (status === "loading") {
  //   } else if (status === "unauthenticated") {
  //   }
  // }, [status]);
  // console.log("");
  return <div>{children}</div>;
}
