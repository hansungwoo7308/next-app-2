import axios from "axios";
import { getToken } from "next-auth/jwt";

export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/auth/signout]\x1b[30m");

  const session: any = await getToken({ req });
  const { access_token } = session.account;
  console.log({ access_token });

  try {
    const response = await axios({
      url: `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&access_token=${access_token}&service_provider=NAVER`,
    });
    // console.log({ response });
    console.log({ result: response.data });
    return res.status(200).json({ message: "signout success" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "signout failed" });
  }
}
