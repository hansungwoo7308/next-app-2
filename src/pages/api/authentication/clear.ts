export default async function handler(req: any, res: any) {
  res.setHeader("Set-Cookie", [
    `accessToken=;Max-Age=-1;path=/`,
    `refreshToken=;Max-Age=-1;path=/`,
  ]);
  res.json({ message: "The cookies are cleared." });
}
