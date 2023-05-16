import { useSelector } from "react-redux";
import { selectAllUsers } from "lib/client/store/usersSlice";

const PostAuthor = ({ userId }: any) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user: any) => user.id === userId);

  return <span>{author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
