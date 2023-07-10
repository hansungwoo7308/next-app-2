import { useSelector } from "react-redux";
// import { selectAllUsers } from "lib/client/store/usersSlice";
export default function PostAuthor({ userId }: any) {
  // const users = useSelector(selectAllUsers);
  const { users }: any = useSelector((store) => store);
  const author = users.find((user: any) => user.id === userId);
  return <span>{author ? author.name : "Unknown author"}</span>;
}
