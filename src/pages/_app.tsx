import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Header from "../components/layout/Header";

import * as StyleComponent from "../styles/_app.styled";
// import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <StyleComponent.GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

{
  // protected routes 를 여기서 구현할 수 있다.
  /* <AuthProvider> // next-auth, AWS, firebase
  {
    // 정적 
    // 동적으로하려면 (데이터베이스 이용) 미들웨어에서 현재의 nextauth session 정보를 가지고 와서
    // 구현해야하지 않을까
    Component.requireAuth ? ( // protect 하고 싶은 페이지만 Admin.requireAuth : true
    <AuthGuard> // here is where put auth logic // loading indicator while querying
      <Component /> // page component
    </AuthGuard>
    ) : (
      <Component /> // page component
    )
  }
</AuthProvider> */
}
