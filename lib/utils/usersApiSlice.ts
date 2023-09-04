import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl =
  process.env.NODE_ENV === "production" ? process.env.BASE_URL : process.env.NEXT_PUBLIC_ENV;
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }: any) => {
    // getState : redux store
    // console.log({ state: getState() });
    const accessToken = getState().auth.accessToken;
    if (accessToken) headers.set("authorization", `Bearer ${accessToken}`);
    return headers;
  },
});
const baseQueryWithReauth = async (endpoint: any, api: any, extraOptions: any) => {
  let result: any = await baseQuery(endpoint, api, extraOptions);
  // console.log({ endpoint, api, extraOptions, result });
  // 403 forbidden
  // if (result?.error?.originalStatus === 403) {
  //   console.log("sending refresh token");
  //   // send refresh token to get new access token
  //   const refreshResult = await baseQuery("/refresh", api, extraOptions);
  //   console.log("refreshResult : ", refreshResult);
  //   if (refreshResult?.data) {
  //     // 다시 요청을 보낼 필요가 없다.
  //     // 스토어에서 사용자 정보를 가져온다.
  //     const user = api.getState().auth.user;
  //     // store the new token
  //     api.dispatch(setCredentials({ ...refreshResult.data, user }));
  //     // retry the original query with new access token
  //     result = await baseQuery(endpoint, api, extraOptions);
  //   } else {
  //     api.dispatch(logOut());
  //   }
  // }
  return result;
};
export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["Post", "User"], // cached data
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/user",
      providesTags: ["Users"],
      // keepUnusedDataFor: 5,// cache time (seconds)
      // query: () => {
      //   return {
      //     url: "/api/users",
      //     method: "GET",
      //   };
      // },
      // for 5 seconds, related to cache
      // default is 60 seconds
    }),
  }),
});
// api hook
export const { useGetUsersQuery } = usersApiSlice;
