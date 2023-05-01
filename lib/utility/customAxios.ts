import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://localhost:3000",

  // refreshToken
  withCredentials: true,

  headers: {
    // accessToken
    // Authorization: `Bearer testing...`,
    "Content-Type": "application/json",
  },
});
