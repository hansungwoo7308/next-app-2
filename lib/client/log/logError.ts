export default function logError(error: any, props?: string) {
  const url = error.config.url;
  const status = error.response.status;
  const statusText = error.response.statusText;
  const message = error.response.data.message;
  const Authorization = error.response.config.headers.Authorization;

  console.group(`${url} : `, status, statusText);
  // if (props) {
  //   const foundProps = Object.fromEntries(
  //     Object.entries(error.config.headers).filter(([key]) =>
  //       key.includes("Authorization")
  //     )
  //   );
  //   console.log(foundProps);
  // }
  if (Authorization) console.log({ Authorization });
  console.log({ message });
  // console.log({ Authorization: error.config.headers.Authorization });
  console.groupEnd();
}
