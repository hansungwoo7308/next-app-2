import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import axios from "axios";
import Providers from "@/components/provider/Providers";
import Layout from "../components/layout/Layout";
import * as StyleComponent from "../styles/_app.styled";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
// import { NextPage } from "next";
interface MyAppProps extends AppProps {
  token?: string;
  testSomething22?: string;
}
export default function MyApp({ Component, pageProps, token }: MyAppProps) {
  const router = useRouter();
  const entryStyles = {
    width: 524,
    height: 650,
  };

  return (
    <Providers session={pageProps.session} token={token}>
      <Layout>
        <StyleComponent.GlobalStyle />
        <Component {...pageProps} router={router} entryStyles={entryStyles} />
      </Layout>
    </Providers>
  );
}

MyApp.getInitialProps = async (AppContext: AppContext) => {
  const appProps = await App.getInitialProps(AppContext);
  const options: any = { req: AppContext.ctx.req, raw: true };
  let token;
  if (AppContext.ctx.req) {
    token = await getToken(options);
  }

  return {
    ...appProps,
    token,
    testSomething22: "bbb",
    // pathname: AppContext.router.pathname,
  };
};
