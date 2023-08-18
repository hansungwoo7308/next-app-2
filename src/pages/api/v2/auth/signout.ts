export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/v2/auth/signout]");
  console.log("Sign out.");
  res.setHeader("Set-Cookie", [`refreshToken=;Max-Age=-1;path=/`]);
  res.status(200).send();
}
