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

export default async function refreshTokens(
  accessToken: string,
  refreshToken: string
) {
  console.log("");
  console.log("\x1b[32m[Client]/setTokens");
  const result = await axiosPrivate("/api/authentication/refresh", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  //   console.log("refresh result : ", result);
  const refreshUser = await result.data;
  //   console.log("refreshUser : ", refreshUser);

  console.log("");
  return refreshUser;
  // set the authorization header
  // axios.defaults.headers.Authorization = `Bearer ${accessToken}`
  // set the cookie
}
