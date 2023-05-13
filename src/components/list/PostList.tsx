import { Box } from "@/styles/components/MarkdownPostList.styled";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "../Modal";
export default function PostList({ list, open, deleteItem }: any) {
  return (
    <Box>
      <h1>Database Post List</h1>
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
      <button onClick={open}>Create a item</button>
    </Box>
  );
}
