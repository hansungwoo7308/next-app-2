export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/v2/auth/signout]");
  res.setHeader("Set-Cookie", [`refreshToken=;Max-Age=-1;path=/`]);
  res.status(200).json({ message: "Signed Out" });
}
