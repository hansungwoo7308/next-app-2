import { Box } from "@/styles/components/MarkdownPostList.styled";
import Link from "next/link";
export default function MarkdownPostList({ list }: any) {
  return (
    <Box>
      <h1>Markdown Post List</h1>
      <ul>
        {list.map((item: any, index: any) => (
          <li key={index}>
            <h5>{item.date}</h5>
            <Link href={`post-list-2/${item.filename}`}>
              <h3>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}
