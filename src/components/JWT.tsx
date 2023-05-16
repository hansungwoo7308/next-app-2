// internal
import { useEffect, useState } from "react";
// external
import {
  logOut,
  selectAcessToken,
  selectRefreshToken,
  setCredentials,
} from "lib/client/store/authSlice";
import { useLogoutMutation, useRefreshMutation } from "lib/utils/authApiSlice";
import { customAxios } from "lib/utils/customAxios";
import refreshTokens from "lib/utils/refreshTokens";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@/styles/components/JWT.styled.js";
export default function JWT() {
  // internal
  const [users, setUsers]: any = useState();
  // external
  // state
  const accessToken = useSelector(selectAcessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const dispatch = useDispatch();
  // rtk fetch query
  const [refresh] = useRefreshMutation();
  const [logout] = useLogoutMutation();
  // const [check] = useCheckMutation();
  const handleRefresh = async (e: any) => {
    e.preventDefault();
    try {
      const result = await customAxios.get("/api/authentication/refresh");
      const refreshUser = await result.data;
      // const refreshUser = await refresh({}).unwrap();
      console.log("refreshUser : ", refreshUser);
      dispatch(setCredentials(refreshUser));
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const result = await logout({});
      console.log("logout result : ", result);
      await dispatch(logOut());
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const handleGetUsers = async (e: any) => {
    try {
      const result = await customAxios.options("/api/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const users = await result.data;
      console.log("result : ", result);
      setUsers(users);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  // const setTokens = async () => {
  //   try {
  //     const result = await customAxios.get("/api/authentication/refresh");
  //     const refreshUser = await result.data;
  //     console.log("refreshUser : ", refreshUser);
  //     dispatch(setCredentials(refreshUser));
  //   } catch (error) {
  //     console.log("error : ", error);
  //   }
  // };
  const handleSetAuth = async () => {
    // refresh the tokens (from server)
    // 새로운 토큰으로 갱신하고 새롭게 갱신된 사용자 데이터(토큰, 페이로드)를 받아온다.
    const refreshUser = await refreshTokens(accessToken, refreshToken);
    // set the store (to client)
    // 새롭게 갱신된 사용자 데이터를 클라이언트 스토어에 저장한다.
    await dispatch(setCredentials({ ...refreshUser }));
  };
  useEffect(() => {
    // setTokens();
    handleSetAuth();
    // console.log("accessToken : ", accessToken);
  }, []);
  return (
    <Box>
      <div>
        <h1>Response Data</h1>
        <div>
          {users?.map((user: any) => (
            <h5>{user}</h5>
          ))}
        </div>
      </div>
      <div>
        <div>
          <h5>accessToken : {accessToken}</h5>
          <h5>refreshToken : {refreshToken}</h5>
        </div>
        <div>
          <button onClick={(e: any) => handleRefresh(e)}>refresh</button>
          <button onClick={(e: any) => handleLogout(e)}>logout</button>
          <button onClick={(e: any) => handleGetUsers(e)}>get users</button>
        </div>
      </div>
    </Box>
  );
}
