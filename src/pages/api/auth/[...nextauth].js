import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/server/config/mongodb";

import connectDB from "../../../../lib/server/config/connectDB";
import User from "../../../../lib/server/models/User";
console.log("\x1b[32m\n[api/auth/[...nextauth]]");
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials, req) {
        console.log("\x1b[33m\n[authorize]\x1b[32m");
        await connectDB();
        // get
        const { email, password } = credentials;
        // find
        const user = await User.findOne({ email })
          // .select("+username +email +role +image")
          .select("-refreshToken -createdAt -updatedAt -__v")
          .exec();
        if (!user) throw new Error("Invalid Email");
        console.log({ user });
        // compare
        const salt = 10; // 이동이 필요(서버 회원가입 핸들러에서 처리)
        const hashedPassword = await bcrypt.hash(user.password, salt); // 이동이 필요(서버 회원가입 핸들러에서 처리)
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordMatched) throw new Error("Invalid Password");
        // out
        return user; // 리턴값은 jwt의 user property에 저장한다.
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // jwt에 user data를 저장하고 토큰을 생성하는 함수
    // token : 로그인 상태라면 기존의 토큰을 리턴한다.
    // user : 로그인할 새로운 유저객체
    // client cookie에 token에는 user data를 포함하지 않도록 되어있다.
    async jwt({ token, user }) {
      // console.log("\x1b[33m\n[jwt]\x1b[32m");
      // console.log({ token, user });
      if (user) {
        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
        token.user = userWithoutPassword;
        token.name = user.username;
      }
      // console.log({ token });
      // console.log();
      return token;
    },
    // session에 user data를 저장하는 함수
    // session : server에 저장되는 user data account object
    // token : jwt function으로부터 생성된 token
    async session({ session, token }) {
      console.log("\x1b[33m\n[session]\x1b[32m");
      // console.log({ session, token });
      // if (session.user) {
      //   session.user.role = token.role;
      // }
      if (session.user) {
        session.user.name = token.user.username;
        session.user.email = token.user.email;
        session.user.role = token.user.role;
      }
      console.log({ session });
      console.log();
      return session;
    },
  },
  pages: {
    // custom pages
    signIn: "/auth/signin",
  },
  // debug: process.env.NODE_ENV === "development",
  // adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    // jwt: true, // 토큰에 대한 상세 옵션을 설정할 수 있다.
    // jwt: {
    //   secret: process.env.JWT_SECRET,
    //   signingKey: process.env.JWT_SIGNING_KEY,
    //   verificationOptions: {
    //     algorithms: ['HS256'],
    //   },
    // },
    // strategy: "database",
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_JWT_SECRET,
  //   // async encode(params) {
  //   //   console.log("encode params : ", params);
  //   //   // return jwt.sign(token, secret);
  //   // },
  //   // async decode(params) {
  //   //   console.log("decode params : ", params);
  //   //   // return jwt.verify(token, secret);
  //   // },
  // },
  /* jwt 사용을 위한 임의의 난수를 할당 */
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
