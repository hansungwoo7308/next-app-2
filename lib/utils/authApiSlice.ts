import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "lib/client/store/authSlice";
// set the base query
// baseQuery에 endpoint를 더하여 요청경로를 완성한다.
// credentials를 포함한다.
// header에 authorization bearer를 설정해준다.
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
    console.log("headers : ", headers);
    return headers;
  },
});
// query with re-auth
// createApi에 객체프로퍼티 중에서 baseQuery는 3개의 파라미터를 가지는 콜백함수를 통해 설정한다.
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
export const authApiSlice = createApi({
  reducerPath: "authApi", // default
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        // credentials : client payload
        // console.log("credentials : ", credentials);
        return {
          url: "/api/authentication",
          method: "POST",
          body: { ...credentials },
        };
      },
    }),
    refresh: builder.mutation({
      query: () => {
        // console.log("something : ", something);
        // input : payload
        // output : request(query) body에 payload를 실어서 보낸다.
        return {
          url: "/api/authentication/refresh",
          method: "GET",
        };
      },
    }),
    check: builder.mutation({
      query: () => {
        return {
          url: "/api/authentication/check",
          method: "GET",
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/api/v2/auth/signout",
          method: "GET",
        };
      },
    }),
  }),
});
// endpoint를 apiSlice에 주입한다.
// export const authApiSlice = authApiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => {
//         console.log("credentials : ", credentials);
//         return {
//           url: "/api/login",
//           method: "POST",
//           body: { ...credentials },
//         };
//       },
//     }),
//   }),
// });
// api actions
export const { useLoginMutation, useRefreshMutation, useCheckMutation, useLogoutMutation } =
  authApiSlice;
// export const { useLoginMutation } = authApiSlice;
