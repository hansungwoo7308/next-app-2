import { useSelector } from "react-redux";
import { customAxios } from "lib/utils/customAxios";
const RequireAuth = ({ children }: any) => {
  const { auth }: any = useSelector((store) => store);
  const checkAuth = async (e: any) => {
    try {
      const result = await customAxios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      const users = await result.data;
      console.log("result : ", result);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  return auth.accessToken ? children : <h1>Forbidden</h1>;
  // return accessToken ? children : router.push("/login");
  // <Navigate to="/login" state={{ from: location }} replace />
};
export default RequireAuth;
