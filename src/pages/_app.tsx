import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import Providers from "@/components/provider/Providers";
import Layout from "../components/layout/Layout";
import * as StyleComponent from "../styles/_app.styled";
import axios from "axios";
import { getToken } from "next-auth/jwt";
// import { NextPage } from "next";
interface MyAppProps extends AppProps {
  token?: string;
}
export default function MyApp({ Component, pageProps, token }: MyAppProps) {
  // console.log({ MyAppToken: token });
  // console.log("\x1b[32m\n[_app]");
  // console.log("pageProps:", pageProps);
  // console.log("Component:", Component);
  const setHeader = (accessToken: any) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // setTimeout(() => {
    //   refreshAuth();
    // }, 1000 * 60);
  };
  return (
    <>
      <Providers session={pageProps.session} token={token}>
        <Layout>
          <StyleComponent.GlobalStyle />
          <Component {...pageProps} auth />
        </Layout>
      </Providers>
    </>
  );
}
// MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (props) => {
//   const { Component, ctx } = props;
//   const pageProps = Component.getInitialProps
//     ? await Component.getInitialProps(ctx)
//     : {};
//   //Anything returned here can be accessed by the client
//   return { pageProps: pageProps, store: ctx.store };
// });
MyApp.getInitialProps = async (AppContext: AppContext) => {
  const appProps = await App.getInitialProps(AppContext);
  // console.log("\x1b[32m\n[_app]");
  // console.log("pathname : ", AppContext.router.pathname);
  // console.log("AppContext : ", AppContext);
  // console.log("appProps : ", appProps);
  // const serializedCooke = AppContext.ctx.req?.headers.cookie;
  // const parsedCookie = cookie.parse(serializedCooke || '');
  // console.log("refreshToken : ", parsedCookie.refreshToken);

  // console.log("AppTree : ", AppContext.AppTree);
  // console.log("Component : ", AppContext.Component);
  // console.log("ctx.req : ", Object.getOwnPropertyNames(AppContext.ctx.req));
  // console.log("ctx.pathname : ", AppContext.ctx.pathname);
  // console.log("ctx.query : ", AppContext.ctx.query);
  // console.log("router : ", AppContext.router);
  // const { authorization }: any = AppContext.ctx.req?.headers;
  // console.log("authorization : ", authorization);
  // axios.defaults.headers.Authorization = `Bearer test`;
  const options: any = {
    req: AppContext.ctx.req,
    raw: true,
  };
  let token;
  if (AppContext.ctx) token = await getToken(options);
  // console.log({ token });
  return {
    ...appProps,
    token,
    // pathname: AppContext.router.pathname,
  };
};
