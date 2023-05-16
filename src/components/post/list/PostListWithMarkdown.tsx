import { Box } from "@/styles/components/post/PostListWithMarkdown.styled";
import Link from "next/link";
export default function PostListWithMarkdown({ list, path }: any) {
  return (
    <Box>
      <h1>Markdown Post List (Static)</h1>
      <ul>
        {list.map((item: any, index: any) => (
          <li key={index}>
            <h5>{item.date}</h5>
            <Link href={`${path}/${item.filename}`}>
              <h3>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}
