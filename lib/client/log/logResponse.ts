export default function logResponse(response: any) {
  const status = response.status;
  const statusText = response.statusText;
  const url = response.config.url;
  // const Authorization = response.config.headers.Authorization;
  const data = response.data;
  const accessToken = data.slicedTokens?.accessToken;
  const refreshToken = data.slicedTokens?.refreshToken;
  console.group(`${url} : `, status, statusText);
  if (url.startsWith("/api/authentication/check")) {
    accessToken && console.log({ accessToken });
    refreshToken && console.log({ refreshToken });
    return;
  }
  console.log(data);
  console.groupEnd();
  // if (Authorization) console.log({ Authorization });
  // if (!data) return;
  // console.log("response.config.method : ", response.config.method);
}
