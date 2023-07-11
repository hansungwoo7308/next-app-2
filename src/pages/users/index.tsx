import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import Image from "next/image";
import { openModal } from "lib/client/store/modalSlice";
export default function Page() {
  const { users }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  // const list = users.map((user: any) => (
  //   <li key={user.id}>
  //     <Link href={`/users/${user.id}`}>{user.name}</Link>
  //   </li>
  // ));
  const list = users.map((user: any) => (
    <li key={user.id}>
      <Link href={`/users/${user._id}`}>
        {user.username}:(role:{user.role})
      </Link>
      {/* <Link href={`/users/${user.id}`}>{user.name}</Link> */}
    </li>
  ));
  return (
    <>
      <Main>
        <section>
          <div>
            <h1>Users List</h1>
            <p>Reference : CDN (jsonplaceholder)</p>
            <table>
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
                      <Link href={`/users/${user._id}`}>Edit</Link>
                      <button
                        onClick={() => {
                          const payload = {
                            data: users,
                            id: user._id,
                            name: user.username,
                            visible: true,
                          };
                          // dispatch(addModal(payload));
                          dispatch(openModal({ message: "Do you want to delete?" }));
                        }}
                      >
                        Delete
                      </button>
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
          a,
          button {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            :hover {
              background-color: #333 !important;
            }
          }
          a:first-of-type {
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
