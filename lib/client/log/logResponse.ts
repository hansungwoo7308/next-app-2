export default function logResponse(response: any) {
  const url = response.config.url;
  const status = response.status;
  const statusText = response.statusText;
  const Authorization = response.config.headers.Authorization;
  const data = response.data;
  const accessToken = data.slicedTokens?.accessToken;
  const refreshToken = data.slicedTokens?.refreshToken;

  console.group(`${url} : `, status, statusText);
  console.log(data);
  // console.log({ payload: data });
  // console.log(data.message);
  if (url === "/api/restricted") {
    console.log(data.decoded);
    console.groupEnd();
    return;
  }
  accessToken && console.log({ accessToken });
  refreshToken && console.log({ refreshToken });
  console.groupEnd();

  // if (Authorization) console.log({ Authorization });
  // if (!data) return;
  // console.log("response.config.method : ", response.config.method);
}
