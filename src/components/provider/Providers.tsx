import { Provider, useDispatch } from "react-redux";
import store from "lib/client/store/store";
import { fetchPosts } from "lib/client/store/postsSlice";
import { fetchUsers } from "lib/client/store/usersSlice";
import { useEffect } from "react";
import { getData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import { SessionProvider, useSession } from "next-auth/react";
import { addToCart } from "lib/client/store/cartSlice";
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
export default function Providers({ test123, children, session }: any) {
  // console.log("session : ", session);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <GlobalState>{children}</GlobalState>
      </SessionProvider>
    </Provider>
  );
}
export function GlobalState({ children }: any) {
  // console.log("children : ", children);
  const dispatch = useDispatch();
  const session = useSession();
  useEffect(() => {
    // if refreshed and cart exist, load the items in redux store
    const cart: any = localStorage.getItem("cart");
    // console.log("cart:", cart);
    if (!cart) return;
    const deserializedCart = JSON.parse(cart);
    // console.log("deserializedCart : ", deserializedCart);
    if (deserializedCart.length) {
      deserializedCart.map((v: any) => {
        dispatch(addToCart(v));
      });
    }
  }, []);
  useEffect(() => {
    // if refreshed and accessToken exist,
    // load the credentials in redux store
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      getData("authentication/check", accessToken)
        .then((response) => {
          const { username, accessToken } = response.data;
          dispatch(setCredentials({ username, accessToken }));
        })
        .catch((error) => {
          localStorage.removeItem("accessToken");
        });
    }
  }, []);
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
