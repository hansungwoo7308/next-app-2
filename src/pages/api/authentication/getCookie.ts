export default async function handler(req: any, res: any) {
  const cookies = req.cookies;
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;
  console.log("cookies : ", cookies);
  res.status(200).json({ accessToken, refreshToken });
}
