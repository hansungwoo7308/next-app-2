import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "lib/client/store/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  // for accessToken
  credentials: "include",
  // set the header
  prepareHeaders: (headers, { getState }: any) => {
    const accessToken = getState().auth.accessToken;
    console.log("accessToken : ", accessToken);
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // args : 조회(query)를 위한 기본 url, method, body,...
  // api : ?
  // extraOptions : ?
  // console.log("args : ", args);
  // console.log("api : ", api);
  // console.log("extraOptions : ", extraOptions);
  let result: any = await baseQuery(args, api, extraOptions);
  // result : backend로부터 응답받은 결과
  // console.log("result : ", result);

  // 403 forbidden
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log("refreshResult : ", refreshResult);
    if (refreshResult?.data) {
      // 다시 요청을 보낼 필요가 없다.
      // 스토어에서 사용자 정보를 가져온다.
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export const usersApiSlice = createApi({
  reducerPath: "usersApi", // optional
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["Post", "User"], // cached data
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: "/api/users",
          method: "GET",
        };
      },
      // query: () => "/api/users",
      // for 5 seconds, related to cache
      // default is 60 seconds
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useGetUsersQuery } = usersApiSlice;
