import Link from "next/link";
import { useGetUsersQuery } from "lib/utils/usersApiSlice";
import { Main } from "../../styles/public/main.styled";
let renderCount = 0;
export default function UserList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery({});
  renderCount++;
  return (
    <>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <div>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : isSuccess ? (
              <>
                <h1>Undefined User List</h1>
                <div>
                  {users.map((user: any, index: number) => (
                    <h5 key={index}>{user}</h5>
                  ))}
                </div>
              </>
            ) : (
              <h1>{JSON.stringify(error)}</h1>
            )}
          </div>
        </section>
      </Main>
    </>
  );
}
