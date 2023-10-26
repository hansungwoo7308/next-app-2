import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

import connectDB from "lib/server/config/connectDB";
import User from "lib/server/models/User";
import bcrypt from "bcrypt";

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../../lib/server/config/mongodb";
// import { AuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        console.log("\x1b[33m\n[authorize]\x1b[32m");

        await connectDB();

        // get
        const { email, password } = credentials;

        // find
        const user = await User.findOne({ email }).select("_id username email role image").exec();
        // .select("+username +email +role +image")
        // .select("-refreshToken -createdAt -updatedAt -__v")
        if (!user) throw new Error("Invalid Email and so No user");
        console.log({ user });

        // compare
        // const salt = 10; // 이동이 필요(서버 회원가입 핸들러에서 처리)
        // const hashedPassword = await bcrypt.hash(user.password, salt); // 이동이 필요(서버 회원가입 핸들러에서 처리)
        // const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
        // if (!isPasswordMatched) throw new Error("Invalid Password");

        // out
        return user; // 리턴값은 jwt의 user property에 저장한다.
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // jwt token 에 user 데이터를 저장한다.
    // user : returned value from authorize function
    // client cookie에 token에는 user data를 포함하지 않도록 되어있다.
    signIn({ user, account, profile }) {
      console.log("\x1b[33m\n[signIn]\x1b[32m");
      console.log({ account });
      if (account?.provider === "naver") {
        return true;
      }
      return false;
    },
    async jwt({ token, user, account }: any) {
      // console.log("\x1b[33m\n[jwt]\x1b[32m");
      if (user) token.user = user;
      if (account) token.account = account;
      // console.log({ token });
      return token;
    },
    // session에 user 데이터를 저장한다.
    // token : returned value from jwt function
    async session({ session, token }: any) {
      console.log("\x1b[33m\n[session]\x1b[32m");
      if (token.user) session.user = token.user;
      if (token.account) session.account = token.account;
      // console.log({ session });
      console.log({ account: session.account });
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout'
  },
  // debug: process.env.NODE_ENV === "development",
  // adapter: MongoDBAdapter(clientPromise),

  // 기본적으로 sessiokn cookie 안에 json web token 을 저장하는 방식을 채택한다.
  // session: {
  //   strategy: "jwt",
  //   // jwt: true, // 토큰에 대한 상세 옵션을 설정할 수 있다.
  //   // jwt: {
  //   //   secret: process.env.JWT_SECRET,
  //   //   signingKey: process.env.JWT_SIGNING_KEY,
  //   //   verificationOptions: {
  //   //     algorithms: ['HS256'],
  //   //   },
  //   // },
  //   // strategy: "database",
  //   // jwt: {
  //   //   secret: process.env.NEXTAUTH_JWT_SECRET,
  //   //   // async encode(params) {
  //   //   //   console.log("encode params : ", params);
  //   //   //   // return jwt.sign(token, secret);
  //   //   // },
  //   //   // async decode(params) {
  //   //   //   console.log("decode params : ", params);
  //   //   //   // return jwt.verify(token, secret);
  //   //   // },
  //   // },
  //   /* jwt 사용을 위한 임의의 난수를 할당 */
  // },

  // secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
