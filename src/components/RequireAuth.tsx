// import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAcessToken } from "lib/store/authSlice";
import { customAxios } from "lib/utility/customAxios";
import { useState } from "react";

const RequireAuth = ({ children }: any) => {
  const accessToken = useSelector(selectAcessToken);
  console.log("accessToken : ", accessToken);
  // const router = useRouter();
  const [auth, setAuth] = useState();

  const checkAuth = async (e: any) => {
    try {
      const result = await customAxios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const users = await result.data;
      console.log("result : ", result);
      setAuth(users);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return accessToken ? children : <h1>Forbidden</h1>;
  // return accessToken ? children : router.push("/login");
  // <Navigate to="/login" state={{ from: location }} replace />
};
export default RequireAuth;
