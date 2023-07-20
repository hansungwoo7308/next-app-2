import Image from "next/image";
import Link from "next/link";
import { openModal } from "lib/client/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function UserList() {
  const { users }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  return (
    <Box>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>ID</th>
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
              <td className="image">
                <Image src={user.image} alt={user.image} width={50} height={50} />
              </td>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="action">
                <Link href={`/users/${user._id}`}>Edit</Link>
                <button
                  onClick={() => {
                    // const payload = {
                    //   data: users,
                    //   id: user._id,
                    //   name: user.username,
                    //   visible: true,
                    // };
                    dispatch(
                      openModal({
                        type: "DELETE_USER",
                        message: "Do you want to delete?",
                        id: user._id,
                      })
                    );
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
const Box = styled.div`
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
          background-color: #111 !important;
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
`;
