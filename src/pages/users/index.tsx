import Link from "next/link";
import { useSelector } from "react-redux";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import Image from "next/image";
// let renderCount = 0;
export default function Page() {
  const { users }: any = useSelector((store) => store);
  // const list = users.map((user: any) => (
  //   <li key={user.id}>
  //     <Link href={`/users/${user.id}`}>{user.name}</Link>
  //   </li>
  // ));
  const list = users.map((user: any) => (
    <li key={user.id}>
      <Link href={`/users/${user._id}`}>{user.username}</Link>
      {/* <Link href={`/users/${user.id}`}>{user.name}</Link> */}
    </li>
  ));
  // console.log("users : ", users);
  // renderCount++;
  return (
    <>
      <Main>
        <section>
          {/* <h1>renderCount : {renderCount}</h1> */}
          <div>
            <h1>Users List</h1>
            <p>Reference : CDN (jsonplaceholder)</p>
            <ul>{list}</ul>
            {/* <table>
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, index: number) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td className="image">
                      <Image src={user.image} alt={user.image} width={50} height={50} />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="action">
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      height: 70%;
      table {
        width: 100%;
        height: 100%;
        border: 2px solid;
        text-align: center;
        th,
        td {
          border: 1px solid;
          padding: 0.5rem;
        }
        .image {
          padding: 0 !important;
          img {
            display: block;
            padding: 0;
          }
        }
        .action {
          height: 100%;
          display: flex;
          padding: 0;
          button {
            flex: 1;
            :hover {
              background-color: #333 !important;
            }
          }
          button:first-of-type {
            background-color: darkcyan;
          }
          button:last-of-type {
            background-color: darksalmon;
          }
        }
      }
    }
  }
`;
