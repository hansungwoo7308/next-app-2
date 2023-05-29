import axios from "axios";
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
  // refreshToken
  withCredentials: true,
  headers: {
    // accessToken
    // Authorization: `Bearer testing...`,
    "Content-Type": "application/json",
  },
});
export default async function refreshTokens(accessToken: string) {
  console.log("\x1b[32m");
  console.log("[Client]/setTokens");
  // xml http request
  // const result = await axiosPrivate("/api/authentication/refresh", {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });
  // const refreshUser = await result.data;
  //   console.log("refresh result : ", result);
  //   console.log("refreshUser : ", refreshUser);
  // fetch
  const refreshUser = fetch("http://localhost:3000/api/authentication/refresh", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("fetch error : ", err));
  console.log("refreshUser : ", refreshUser);
  console.log("");
  return refreshUser;
  // set the authorization header
  // axios.defaults.headers.Authorization = `Bearer ${accessToken}`
  // set the cookie
}
