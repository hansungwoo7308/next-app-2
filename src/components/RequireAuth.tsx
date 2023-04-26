import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAcessToken } from "lib/store/authSlice";

const RequireAuth = ({ children }: any) => {
  const token = useSelector(selectAcessToken);
  console.log("token : ", token);
  const router = useRouter();
  return token ? children : router.push("/login");
  // <Navigate to="/login" state={{ from: location }} replace />
};
export default RequireAuth;
