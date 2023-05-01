// internal
import Link from "next/link";

// external
import { useGetUsersQuery } from "lib/utility/usersApiSlice";
import { Main } from "../../styles/public/main.styled";
let renderCount = 0;
const UserList = () => {
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
          {/* <h1>renderCount : {renderCount}</h1> */}
          <div>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : isSuccess ? (
              <>
                <h1>UserList</h1>
                <div>
                  {users.map((user: any) => (
                    <h5>{user}</h5>
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
};

export default UserList;
