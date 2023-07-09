import Link from "next/link";
import { useSelector } from "react-redux";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import Image from "next/image";
// let renderCount = 0;
export default function Page() {
  const { users }: any = useSelector((store) => store);
  const list = users.map((user: any) => (
    <li key={user.id}>
      <Link href={`/users/${user.id}`}>{user.name}</Link>
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
            <table>
              <thead>
                <tr>
                  <th>---</th>
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
                    <td>
                      <Image src={user.image} alt={user.image} width={100} height={100} />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 70%;
      height: 70%;
      max-width: 700px;
      table {
        height: 100%;
        border: 2px solid;
        * {
          border: 1px solid;
        }
        img {
          display: block;
        }
        > tbody > tr > td:last-of-type {
          height: 100%;
          /* border: 2px solid red; */
          display: flex;
          /* flex-direction: column; */
          button {
            flex: 1;
          }
        }
      }
    }
  }
`;
