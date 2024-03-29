export default function logResponse(res: any) {
  if (!res.config) return console.log("No response configuration...");
  const { url } = res.config;
  const { status, statusText } = res;
  console.group(url, " : ", status, statusText);
  if (!res.data) return console.groupEnd();
  const { data } = res;
  console.log(data);
  console.groupEnd();
}
