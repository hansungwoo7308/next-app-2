import { Provider, useDispatch } from "react-redux";
import store from "lib/client/store/store";
import { fetchPosts } from "lib/client/store/postsSlice";
import { fetchUsers } from "lib/client/store/usersSlice";
import { useEffect } from "react";
import { getData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import { SessionProvider, useSession } from "next-auth/react";
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
    const accessToken = localStorage.getItem("accessToken");
    // console.log("accessToken : ", accessToken);
    if (!accessToken) return;
    getData("authentication/check", accessToken)
      .then((response) => {
        const { username, accessToken } = response.data;
        dispatch(setCredentials({ username, accessToken }));
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
      });
  }, []);
  useEffect(() => {
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
  });
  return <>{children}</>;
}
