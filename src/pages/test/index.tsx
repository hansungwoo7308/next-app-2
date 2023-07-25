import { useGetUsersQuery, usersApiSlice } from "lib/utils/usersApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styles/public/main.styled";
export default function Page() {
  const dispatch = useDispatch();
  const { auth, usersApi }: any = useSelector((store) => store);
  const { data, isLoading, isSuccess, isError, error, refetch } = useGetUsersQuery({});
  // useEffect(() => {
  //   if (data) console.log({ data });
  // }, [data]);
  useEffect(() => {
    if (auth.accessToken) refetch();
  }, [auth.accessToken]);
  return (
    <>
      <Main>
        <section>
          <div>
            {isLoading && <h1>Loading...</h1>}
            {isSuccess && (
              <>
                <h1>User List</h1>
                <div>
                  {data.users.map((user: any, index: number) => (
                    <h5 key={index}>{user.username}</h5>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </Main>
    </>
  );
}
