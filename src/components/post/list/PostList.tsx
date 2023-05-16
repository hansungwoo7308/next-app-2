import { Box } from "@/styles/components/post/PostListWithMarkdown.styled";
import Link from "next/link";
export default function PostList({ list, openModal, deleteItem }: any) {
  return (
    <Box>
      <div>
        <h1>Database Post List (Dynamic)</h1>
        <ul>
          {list.map((item: any, index: any) => (
            <li key={index}>
              <Link href={`post-list-2/${item.title}`}>
                <h3>{item.title}</h3>
              </Link>
              <p>{item.content}</p>
              <button
                onClick={(e: any) => {
                  e.preventDefault();
                  deleteItem(item.title);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={openModal}>Create a item</button>
    </Box>
  );
}
