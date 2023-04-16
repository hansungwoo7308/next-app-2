import { useSelector } from "react-redux";
import { selectAllUsers } from "lib/store/userSlice";
import Link from "next/link";

let renderCount = 0;

const Users = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user: any) => (
    <li key={user.id}>
      <Link href={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  renderCount++;

  return (
    <>
      <main className="users">
        <section>
          <h1>renderCount : {renderCount}</h1>
          <div>
            <h1>Users Page</h1>
            <ul>{renderedUsers}</ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Users;
