import axios from "axios";
const baseUrl = process.env.BASE_URL;
export const getData = async (url: string, token: string) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:3000/api/${url}`,
    headers: {
      Authorization: token,
    },
  });
  return response;
};
export const postData = async (url: string, post: any, token?: string | any) => {
  const response = await axios({
    method: "post",
    url: `http://localhost:3000/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: post,
  });
  return response;
};
export const putData = async (url: string, post: any, token: string) => {
  const response = await axios({
    method: "put",
    url: `http://localhost:3000/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: post,
  });
  return response;
};
export const patchData = async (url: string, post: any, token: string) => {
  const response = await axios({
    method: "patch",
    url: `http://localhost:3000/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: post,
  });
  return response;
};
export const deleteData = async (url: string, token: string) => {
  const response = await axios({
    method: "delete",
    url: `http://localhost:3000/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
};
