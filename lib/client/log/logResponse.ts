export default function logResponse(response: any) {
  const url = response.config.url;
  const status = response.status;
  const statusText = response.statusText;
  const Authorization = response.config.headers.Authorization;
  const data = response.data;
  console.group(`${url} : `, status, statusText);
  if (Authorization) console.log({ Authorization });
  if (data) console.log(data);
  console.groupEnd();
  // console.log("response.config.method : ", response.config.method);
}
