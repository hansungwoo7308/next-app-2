import Link from "next/link";
import styled from "styled-components";
export default function PostList({ posts, handleCreatePost, handleDeletePost }: any) {
  return (
    <Box>
      <h1>PostList Component (Dynamic : Database)</h1>
      <ul>
        {posts.map((item: any, index: any) => (
          <li key={index}>
            <Link href={`post-list-2/${item.title}`}>
              <h3>{item.title}</h3>
            </Link>
            <p>{item.content}</p>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                handleDeletePost(item._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={(e: any) => {
          e.preventDefault();
          handleCreatePost();
        }}
      >
        Create a Post
      </button>
    </Box>
  );
}
const Box = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > ul {
    /* height: 100%; */
    min-height: 500px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 10px;
    > li {
      outline: 2px solid green;
      width: 100px;
      height: 100px;
      /* width: 5rem;
      height: 5rem; */
      /* width: 5em;
      height: 5em; */
    }
  }
`;
