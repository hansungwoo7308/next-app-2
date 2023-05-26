export default function logError(error: any) {
  const message = error.message;
  const status = error.response.status;
  const statusText = error.response.statusText;

  console.group();
  console.log("error.message : ", message);
  console.log("error.response.status : ", status);
  console.log("error.response.statusText : ", statusText);
  console.groupEnd();
}
