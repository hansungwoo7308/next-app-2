import { Provider, useDispatch, useSelector } from "react-redux";
import store from "lib/client/store/store";
import { fetchPosts } from "lib/client/store/postsSlice";
import { fetchUsers } from "lib/client/store/usersSlice";
import { useEffect } from "react";
import { getData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import { SessionProvider, useSession } from "next-auth/react";
import { addToCart, updateCart } from "lib/client/store/cartSlice";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { useRouter } from "next/router";
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
export default function Providers({ test123, children, session }: any) {
  // console.log("session : ", session);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <PayPalScriptProvider
          options={{
            clientId:
              // "Ab2uPl_Wo2-UDJ569Byt3xFloItf-fgdla5iQwfryndLbQFASTbwSr23GUJXj7B9lyybjL44iKADN1ZH",
              "ARL6BSMyqeQMRB31JuDJqvSeOryXUsFjLWyWOR8cG7oLi7peAw6LM3KDE37fUFEZawTeKyuESe5d4BbD",
            currency: "USD",
          }}
        >
          <GlobalState>{children}</GlobalState>
        </PayPalScriptProvider>
      </SessionProvider>
    </Provider>
  );
}
export function GlobalState({ children }: any) {
  // console.log("children : ", children);
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();
  const store = useSelector((store) => store);
  const { auth, cart }: any = store;
  const refreshAuth = async () => {
    try {
      const response = await axios.post("/api/authentication/refresh");
      const accessToken = response.data.accessToken;
      logResponse(response);
      // setHeader(accessToken);
      localStorage.setItem("accessToken", accessToken);
      dispatch(setCredentials({ mode: "general", status: true, accessToken }));
    } catch (error) {
      logError(error);
      router.push("/");
    }
  };
  // 로드 시 : 스토어에 카트 캐싱
  useEffect(() => {
    // if refreshed and cart exist, load the items in redux store
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parseCart = JSON.parse(serializedCart);
    // dispatch(updateCart(parseCart));
    parseCart.map((v: any) => {
      dispatch(addToCart(v));
    });
  }, []);
  // 카트 변경 시 : 로컬 스토리지에 캐싱
  useEffect(() => {
    // if cart is changed, load the cart
    if (!cart.length) return;
    const stringfiedCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringfiedCart);
  }, [cart]);
  // 로드 시 : 스토어에서 엑세스 토큰을 체킹
  useEffect(() => {
    // if refreshed and accessToken exist,
    // load the credentials in redux store
    // console.log("로드 시 : 로컬 스토리지에서...");
    // const accessToken = localStorage.getItem("accessToken");
    const { accessToken } = auth;
    if (accessToken) {
      getData("authentication/check", accessToken)
        .then((response) => {
          // const { username } = response.data;
          // dispatch(setCredentials({ mode: "general", status: true, username, accessToken }));
          logResponse(response);
          // console.log("response.data : ", response.data);
        })
        .catch((error) => {
          logError(error);
          refreshAuth();
          // 만약 리프레시 토큰도 만료되면 다시 로그인해야함.
          // localStorage.removeItem("accessToken");
        });
    }
  });
  // 로드 시 : 스토어에 엑세스 토큰이 없으면 레프레시 요청
  useEffect(() => {
    const { accessToken } = auth;
    if (!accessToken) {
      refreshAuth();
    }
  }, []);
  // 로드 시 : 스토어에 크레덴셜을 캐싱 (next-auth의 세션으로부터)
  useEffect(() => {
    // if refreshed by nextauth session status,
    // load the auth status in redux store
    if (session.status === "authenticated") {
      // console.log(session);
      dispatch(
        setCredentials({
          mode: "nextauth",
          status: true,
          username: "nextauth",
          accessToken: "1234",
        })
      );
    }
  }, []);
  return <>{children}</>;
}
