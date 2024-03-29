import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "production" ? process.env.BASE_URL : process.env.NEXT_PUBLIC_ENV;
// console.log({ baseUrl });
export const getData = async (url: string, token?: string, payload?: any) => {
  const response = await axios({
    method: "get",
    url: `${baseUrl}/api/${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: payload,
  });
  return response;
};
export const postData = async (url: string, payload: any, token?: string | any) => {
  const response = await axios({
    method: "post",
    url: `${baseUrl}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
  return response;
};
export const putData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "put",
    url: `${baseUrl}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
  return response;
};
export const patchData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "patch",
    url: `${baseUrl}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
  return response;
};
export const deleteData = async (url: string, payload: any, token: string) => {
  const response = await axios({
    method: "delete",
    url: `${baseUrl}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
  // const response = await axios.delete(
  //   `${baseUrl}/api/${url}`,
  //   // {
  //   //   data: { test: "test" },
  //   // }
  //   {
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       // Authorization: `Bearer ${token}`,
  //     },

  //     data: { foo: "bar" },
  //   }
  // );
  return response;
};
