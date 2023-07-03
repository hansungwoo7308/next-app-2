import { Provider, useDispatch, useSelector } from "react-redux";
import store from "lib/client/store/store";
import { fetchPosts } from "lib/client/store/postsSlice";
import { fetchUsers } from "lib/client/store/usersSlice";
import { useEffect } from "react";
import { getData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import { SessionProvider, useSession } from "next-auth/react";
import { addToCart, clearCart, updateCart } from "lib/client/store/cartSlice";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { useRouter } from "next/router";
import { setNotify } from "lib/client/store/notifySlice";
import { addOrder, setOrders } from "lib/client/store/ordersSlice";
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
      const response = await getData("authentication/refresh");
      const { username, role, image, accessToken } = response.data;
      logResponse(response);
      dispatch(
        setCredentials({ status: true, mode: "general", username, role, image, accessToken })
      );
    } catch (error) {
      logError(error);
      // router.push("/");
    }
  };
  /* Auth */
  // if loaded, accessToken 항시 검증 (store)
  // useEffect(() => {
  //   const { accessToken } = auth;
  //   if (accessToken) {
  //     getData("authentication/check", accessToken)
  //       .then((response) => {
  //         logResponse(response);
  //         const { username, role, image } = response.data.verified;
  //         dispatch(
  //           setCredentials({ status: true, mode: "general", username, role, image, accessToken })
  //         );
  //       })
  //       .catch((error) => {
  //         logError(error);
  //         refreshAuth();
  //       });
  //   }
  // });
  // if first loaded, 엑세스 토큰이 없으면 리프레시 요청 (store)
  useEffect(() => {
    const { accessToken } = auth;
    if (!accessToken) {
      refreshAuth();
    }
  }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refreshAuth();
  //   }, 1000 * 10);
  // }, []);

  // 로드 시 : next-auth.session (store)
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
  /* Cart */
  // if first loaded, 캐싱 (store)
  useEffect(() => {
    // if refreshed and cart exist, load the items in store
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parseCart = JSON.parse(serializedCart);
    // console.log("parseCart : ", parseCart);
    dispatch(clearCart());
    dispatch(updateCart(parseCart));
    //
    // sdhfslfhlishf
    // parseCart.map((v: any) => {
    //   dispatch(addToCart(v));
    // });
  }, []);
  // if cart changed, : 캐싱 (storage)
  useEffect(() => {
    // if cart is changed, load the cart
    if (!cart.length) return;
    const stringfiedCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringfiedCart);
  }, [cart]);
  useEffect(() => {
    if (!auth.accessToken) return;
    const getOrder = async () => {
      const response = await getData("order", auth.accessToken);
      const { orders } = response.data;
      // console.log("data : ", response.data);
      logResponse(response);
      dispatch(setOrders(orders));
      // dispatch(addOrder(order));
    };
    try {
      getOrder();
    } catch (error: any) {
      dispatch(setNotify({ status: "error", message: error.message, visible: true }));
      logError(error);
    }
  }, [auth.accessToken]);
  return <>{children}</>;
}
