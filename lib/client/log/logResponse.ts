export default function logResponse(response: any) {
  const url = response.config.url;
  const status = response.status;
  const statusText = response.statusText;
  const Authorization = response.config.headers.Authorization;
  const data = response.data;

  console.group(`${url} : `, status, statusText);
  console.log({ payload: data });
  console.log({ accessToken: data.slicedTokens.accessToken });
  console.log({ refreshToken: data.slicedTokens.refreshToken });
  // console.log({ accessToken: data.accessToken });
  // console.log({ refreshToken: data.refreshToken });

  console.groupEnd();

  // if (Authorization) console.log({ Authorization });
  // if (!data) return;
  // console.log("response.config.method : ", response.config.method);
}
